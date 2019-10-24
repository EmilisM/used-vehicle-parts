﻿using System;
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
        private readonly Repository<UserData> _userRepository;
        private readonly IConfiguration _configuration;
        private readonly ICryptographicService _cryptographicService;
        private readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler;

        public UserService(IUnitOfWork unitOfWork, IConfiguration configuration,
            ICryptographicService cryptographicService, JwtSecurityTokenHandler jwtSecurityTokenHandler)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
            _cryptographicService = cryptographicService;
            _jwtSecurityTokenHandler = jwtSecurityTokenHandler;
            _userRepository = unitOfWork.GetRepository<UserData>();
        }

        public async Task<string> Authenticate(string username, string password)
        {
            var user = await _userRepository.Get(data => data.Username == username);

            var singleUser = user.FirstOrDefault();

            if (singleUser == null)
            {
                throw new UsernameOrPasswordInvalidException();
            }

            var hash = _cryptographicService.GenerateHash(password, singleUser.PasswordSalt);

            if (hash != singleUser.PasswordHash)
            {
                throw new UsernameOrPasswordInvalidException();
            }

            var token = CreateJwtToken(singleUser.Id.ToString());

            return token;
        }

        public async Task<string> Registrate(string username, string password)
        {
            var user = await _userRepository.Get(data => data.Username == username);

            var singleUser = user.FirstOrDefault();

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
            var createdUser = createdUsers.FirstOrDefault();

            if (createdUser == null)
            {
                throw new RegistrationException();
            }

            var token = CreateJwtToken(createdUser.Id.ToString());

            return token;
        }

        public ClaimsIdentity CreateClaimsIdentity(string userId)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userId)
            };

            var claimsIdentity = new ClaimsIdentity(claims);

            return claimsIdentity;
        }

        public string CreateJwtToken(string userId, string algorithmType = SecurityAlgorithms.HmacSha256Signature,
            double expiryInMinutes = 30)
        {
            var secret = _configuration["JWTSecret"];
            if (secret == null)
            {
                return null;
            }

            var key = Encoding.ASCII.GetBytes(secret);
            var symmetricSecurityKey = new SymmetricSecurityKey(key);

            var claimsIdentity = CreateClaimsIdentity(userId);
            var signingCredentials =
                new SigningCredentials(symmetricSecurityKey, algorithmType);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claimsIdentity,
                Expires = DateTime.UtcNow.AddMinutes(expiryInMinutes),
                SigningCredentials = signingCredentials
            };

            var token = _jwtSecurityTokenHandler.CreateToken(tokenDescriptor);
            var tokenSerialized = _jwtSecurityTokenHandler.WriteToken(token);

            return tokenSerialized;
        }
    }
}