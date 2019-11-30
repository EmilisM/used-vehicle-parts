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
    public class TrimController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Trim> _trimRepository;

        public TrimController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _trimRepository = _unitOfWork.GetRepository<Trim>();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Trim>>> Get()
        {
            var makes = await _trimRepository.Get(null, new[] { nameof(Trim.Model) });

            return Ok(makes);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Trim>> Get(int id)
        {
            var row = await _trimRepository.GetById(id, new[] { nameof(Trim.Model) });

            return row == null ? (ActionResult<Trim>) NotFound() : Ok(row);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Trim>> Post([FromBody] Trim entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _trimRepository.Create(entity);
            await _unitOfWork.Save();

            return Ok(entity);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Trim>> Put(int id, [FromBody] Trim entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _trimRepository.UpdateById(id, entity);

            if (result == null)
            {
                return NotFound();
            }

            await _unitOfWork.Save();

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Trim>> Delete(int id)
        {
            var result = await _trimRepository.Delete(id);

            if (result == null)
            {
                return NotFound();
            }

            await _unitOfWork.Save();

            return Ok(result);
        }
    }
}