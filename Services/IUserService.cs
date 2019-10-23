using System.Threading.Tasks;

namespace UsedVehicleParts.Services
{
    public interface IUserService
    {
        Task<string> Authenticate(string username, string password);
        Task<string> CreateAuthentication(string username, string password);
    }
}