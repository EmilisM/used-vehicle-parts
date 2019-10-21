using System.Threading.Tasks;
using UsedVehicleParts.Entities;

namespace UsedVehicleParts.Services
{
    public interface IUserService
    {
        Task<UserData> Authenticate(string username, string password);
        Task<UserData> Registrate(string username, string password);
    }
}