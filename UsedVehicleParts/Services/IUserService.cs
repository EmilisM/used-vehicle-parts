using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

using Microsoft.IdentityModel.Tokens;

namespace UsedVehicleParts.Services
{
    public interface IUserService
    {
        Task<string> Authenticate(string username, string password);

        Task<string> Registrate(string username, string password);

        IEnumerable<Claim> CreateClaims(string userId);

        string CreateJwtToken(
            string userId,
            DateTime expiry,
            string algorithmType = SecurityAlgorithms.HmacSha256Signature);
    }
}