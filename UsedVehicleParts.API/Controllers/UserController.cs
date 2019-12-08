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
                Email = user.Email,
                ContactPhone = user.ContactPhone,
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
                var token = await _userService.AuthenticateAsync(loginModel.Email, loginModel.Password);

                var tokenModel = new TokenModel(token);

                return Ok(tokenModel);
            }
            catch (EmailOrPasswordInvalidException)
            {
                return BadRequest(new ErrorResponseModel("Email or password is invalid"));
            }
        }

        [HttpPost("registration")]
        public async Task<ActionResult<TokenModel>> Registrate([FromBody] RegistrationModel registrationModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var token = await _userService.RegistrateAsync(registrationModel.Email, registrationModel.Password);

                var tokenModel = new TokenModel(token);

                return Ok(tokenModel);
            }
            catch (EmailTakenException)
            {
                return BadRequest(new ErrorResponseModel("Email is taken"));
            }
            catch (RegistrationException)
            {
                return StatusCode(500);
            }
        }
    }
}