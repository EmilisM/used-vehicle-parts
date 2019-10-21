using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UsedVehicleParts.Models;
using UsedVehicleParts.Services;

namespace UsedVehicleParts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] LoginModel loginModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _userService.Authenticate(loginModel.Username, loginModel.Password);

            if (user == null)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] LoginModel loginModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _userService.Registrate(loginModel.Username, loginModel.Password);

            if (user == null)
            {
                return BadRequest("User with this username already exists");
            }

            return Ok();
        }
    }
}