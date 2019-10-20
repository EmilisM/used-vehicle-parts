using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UsedVehicleParts.DAL;
using UsedVehicleParts.Entities;

namespace UsedVehicleParts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<UserData> _UserDataRepository;

        public UserController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _UserDataRepository = _unitOfWork.GetRepository<UserData>();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserData>>> Get()
        {
            var makes = await _UserDataRepository.Get();

            return Ok(makes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserData>> Get(int id)
        {
            var row = await _UserDataRepository.GetById(id);

            return row == null ? (ActionResult<UserData>) NotFound() : Ok(row);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UserData entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _UserDataRepository.Create(entity);
            await _unitOfWork.Save();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] UserData entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _UserDataRepository.UpdateById(id, entity);

            if (result == null)
            {
                return NotFound();
            }

            await _unitOfWork.Save();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _UserDataRepository.Delete(id);

            if (result == null)
            {
                return NotFound();
            }

            await _unitOfWork.Save();

            return Ok();
        }
    }
}