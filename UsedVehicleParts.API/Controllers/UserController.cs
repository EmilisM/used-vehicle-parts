using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UsedVehicleParts.API.DAL;
using UsedVehicleParts.API.DAL.Entities;
using UsedVehicleParts.API.Models;
using UsedVehicleParts.API.Services;

namespace UsedVehicleParts.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IRepository<UserData> _userRepository;

        public UserController(IUserService userService, IUnitOfWork unitOfWork)
        {
            _userService = userService;
            _userRepository = unitOfWork.GetRepository<UserData>();
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<UserInfoModel>> Get()
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return BadRequest();
            }

            var user = await _userRepository.GetById(userId.Value);

            if (user == null)
            {
                return NotFound();
            }

            var userInfoModel = new UserInfoModel
            {
                Username = user.Username,
                ContactPhone = user.ContactPhone,
                Email = user.Email,
                Reputation = user.Reputation
            };

            return Ok(userInfoModel);
        }

        [HttpPost("authentication")]
        public async Task<ActionResult<TokenModel>> Authenticate([FromBody] LoginModel loginModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var token = await _userService.AuthenticateAsync(loginModel.Username, loginModel.Password);

                var tokenModel = new TokenModel(token);

                return Ok(tokenModel);
            }
            catch (UsernameOrPasswordInvalidException)
            {
                return BadRequest(new ErrorResponseModel("Username or password is invalid"));
            }
        }

        [HttpPost("registration")]
        public async Task<ActionResult<TokenModel>> Registrate([FromBody] LoginModel loginModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var token = await _userService.RegistrateAsync(loginModel.Username, loginModel.Password);

                var tokenModel = new TokenModel(token);

                return Ok(tokenModel);
            }
            catch (UsernameTakenException)
            {
                return BadRequest(new ErrorResponseModel("Username is taken"));
            }
            catch (RegistrationException)
            {
                return StatusCode(500);
            }
        }
    }
}