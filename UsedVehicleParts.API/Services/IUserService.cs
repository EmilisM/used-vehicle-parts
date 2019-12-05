﻿using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace UsedVehicleParts.API.Services
{
    public interface IUserService
    {
        Task<string> AuthenticateAsync(string email, string password);
        Task<string> RegistrateAsync(string email, string password);
        IEnumerable<Claim> CreateClaims(string userId);

        string CreateJwtToken(string userId, DateTime expiry,
            string algorithmType = SecurityAlgorithms.HmacSha256Signature);

        bool IsEmailAddress(string email);
    }
}