using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UsedVehicleParts.DAL;
using UsedVehicleParts.Entities;

namespace UsedVehicleParts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Part> _partRepository;

        private readonly string[] _includeProperties =
        {
            nameof(Part.Buyer), nameof(Part.Image), nameof(Part.PartClass), nameof(Part.Seller),
            nameof(Part.Trim)
        };

        public PartController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _partRepository = _unitOfWork.GetRepository<Part>();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Part>>> Get()
        {
            var makes = await _partRepository.Get(null, _includeProperties);

            return Ok(makes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Part>> Get(int id)
        {
            var row = await _partRepository.GetById(id, _includeProperties);

            return row == null ? (ActionResult<Part>) NotFound() : Ok(row);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Part entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _partRepository.Create(entity);
            await _unitOfWork.Save();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Part entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _partRepository.UpdateById(id, entity);

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
            var result = await _partRepository.Delete(id);

            if (result == null)
            {
                return NotFound();
            }

            await _unitOfWork.Save();

            return Ok();
        }
    }
}