using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using UsedVehicleParts.DAL;
using UsedVehicleParts.DAL.Entities;

namespace UsedVehicleParts.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<UserData> _userRepository;
        private readonly IConfiguration _configuration;
        private readonly ICryptographicService _cryptographicService;

        public UserService(IUnitOfWork unitOfWork, IConfiguration configuration,
            ICryptographicService cryptographicService)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
            _cryptographicService = cryptographicService;
            _userRepository = unitOfWork.GetRepository<UserData>();
        }

        public async Task<string> Authenticate(string username, string password)
        {
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                throw new UsernameOrPasswordInvalidException();
            }

            var user = await _userRepository.Get(data => data.Username == username);

            var singleUser = user?.FirstOrDefault();

            if (singleUser == null)
            {
                throw new UsernameOrPasswordInvalidException();
            }

            var hash = _cryptographicService.GenerateHash(password, singleUser.PasswordSalt);

            if (hash != singleUser.PasswordHash)
            {
                throw new UsernameOrPasswordInvalidException();
            }

            var token = CreateJwtToken(singleUser.Id.ToString(), DateTime.Now.AddMinutes(30));

            return token;
        }

        public async Task<string> Registrate(string username, string password)
        {
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                throw new UsernameOrPasswordInvalidException();
            }

            var user = await _userRepository.Get(data => data.Username == username);

            var singleUser = user?.FirstOrDefault();

            if (singleUser != null)
            {
                throw new UsernameTakenException();
            }

            var salt = _cryptographicService.GenerateSalt();
            var hash = _cryptographicService.GenerateHash(password, salt);

            var userData = new UserData
            {
                Username = username,
                PasswordSalt = salt,
                PasswordHash = hash
            };

            await _userRepository.Create(userData);
            await _unitOfWork.Save();

            var createdUsers = await _userRepository.Get(userEntity => userEntity.Username == username);
            var createdUser = createdUsers?.FirstOrDefault();

            if (createdUser == null)
            {
                throw new RegistrationException();
            }

            var token = CreateJwtToken(createdUser.Id.ToString(), DateTime.Now.AddMinutes(30));

            return token;
        }

        public string CreateJwtToken(string userId, DateTime expiry,
            string algorithmType = SecurityAlgorithms.HmacSha256Signature)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ArgumentNullException();
            }

            if (expiry <= DateTime.Now)
            {
                throw new ArgumentException();
            }

            var secret = _configuration["JWTSecret"];
            if (secret == null)
            {
                throw new ConfigurationMissingException();
            }

            var key = Encoding.ASCII.GetBytes(secret);
            var symmetricSecurityKey = new SymmetricSecurityKey(key);

            var claims = CreateClaims(userId);
            var signingCredentials =
                new SigningCredentials(symmetricSecurityKey, algorithmType);

            var token = new JwtSecurityToken(claims: claims, expires: expiry,
                signingCredentials: signingCredentials);

            var tokenSerialized = new JwtSecurityTokenHandler().WriteToken(token);

            return tokenSerialized;
        }

        public IEnumerable<Claim> CreateClaims(string userId)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ArgumentNullException();
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId)
            };

            return claims;
        }
    }
}