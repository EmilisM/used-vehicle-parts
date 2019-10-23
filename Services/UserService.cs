using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using UsedVehicleParts.DAL;
using UsedVehicleParts.Entities;

namespace UsedVehicleParts.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly Repository<UserData> _userRepository;
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
            var user = await _userRepository.Get(data => data.Username == username);

            var singleUser = user.FirstOrDefault();

            if (singleUser == null)
            {
                return null;
            }

            var hash = _cryptographicService.GenerateHash(password, singleUser.PasswordSalt);

            if (hash != singleUser.PasswordHash)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JWTSecret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, singleUser.Id.ToString()),
                }),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenSerialized = tokenHandler.WriteToken(token);

            return tokenSerialized;
        }

        public async Task<string> CreateAuthentication(string username, string password)
        {
            var user = await _userRepository.Get(data => data.Username == username);

            var singleUser = user.FirstOrDefault();

            if (singleUser != null)
            {
                return null;
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

            return "";
        }
    }
}