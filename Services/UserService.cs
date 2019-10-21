using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
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

        public async Task<UserData> Authenticate(string username, string password)
        {
            var user = await _userRepository.Get(data => data.Username == username);

            var singleUser = user.FirstOrDefault();

            if (singleUser == null)
            {
                return null;
            }

            var hash = _cryptographicService.GenerateHash(password, singleUser.PasswordSalt);

            return hash == singleUser.PasswordHash ? singleUser : null;
        }

        public async Task<UserData> Registrate(string username, string password)
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

            return userData;
        }
    }
}