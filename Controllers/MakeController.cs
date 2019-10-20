using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UsedVehicleParts.DAL;
using UsedVehicleParts.Entities;

namespace UsedVehicleParts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MakeController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        private readonly Repository<Make> _makeRepository;

        public MakeController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _makeRepository = _unitOfWork.GetRepository<Make>();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Make>>> Get()
        {
            var makes = await _makeRepository.Get();

            return Ok(makes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Make>> Get(int id)
        {
            var row = await _makeRepository.GetById(id);

            return row == null ? (ActionResult<Make>) NotFound() : Ok(row);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Make entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _makeRepository.Create(entity);
            await _unitOfWork.Save();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Make entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _makeRepository.UpdateById(id, entity);

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
            var result = await _makeRepository.Delete(id);

            if (result == null)
            {
                return NotFound();
            }

            await _unitOfWork.Save();

            return Ok();
        }
    }
}