using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UsedVehicleParts.API.DAL;
using UsedVehicleParts.API.DAL.Entities;

namespace UsedVehicleParts.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartClassController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<PartClass> _partClassRepository;

        public PartClassController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _partClassRepository = _unitOfWork.GetRepository<PartClass>();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<PartClass>>> Get([FromQuery] string query)
        {
            var makes = await _partClassRepository.Get(partClass =>
                string.IsNullOrWhiteSpace(query) || partClass.Name.ToLower().Contains(query.ToLower()));

            return Ok(makes);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<PartClass>> Get(int id)
        {
            var row = await _partClassRepository.GetById(id);

            return row == null ? (ActionResult<PartClass>) NotFound() : Ok(row);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PartClass>> Post([FromBody] PartClass entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _partClassRepository.Create(entity);
            await _unitOfWork.Save();

            return Ok(entity);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<PartClass>> Put(int id, [FromBody] PartClass entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _partClassRepository.UpdateById(id, entity);

            if (result == null)
            {
                return NotFound();
            }

            await _unitOfWork.Save();

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<PartClass>> Delete(int id)
        {
            var result = await _partClassRepository.Delete(id);

            if (result == null)
            {
                return NotFound();
            }

            await _unitOfWork.Save();

            return Ok(result);
        }
    }
}