using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace UsedVehicleParts.Services
{
    public interface IUserService
    {
        Task<string> Authenticate(string username, string password);
        Task<string> Registrate(string username, string password);
        ClaimsIdentity CreateClaimsIdentity(string userId);
        string CreateJwtToken(string userId, string algorithmType = SecurityAlgorithms.HmacSha256Signature, double expiryInMinutes = 30);
    }
}