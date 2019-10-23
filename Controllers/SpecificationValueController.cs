using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UsedVehicleParts.DAL;
using UsedVehicleParts.Entities;

namespace UsedVehicleParts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecificationValueController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<SpecificationValue> _specificationValueRepository;

        public SpecificationValueController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _specificationValueRepository = _unitOfWork.GetRepository<SpecificationValue>();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<SpecificationValue>>> Get()
        {
            var makes = await _specificationValueRepository.Get(null, new[] { nameof(SpecificationValue.Part) });

            return Ok(makes);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<SpecificationValue>> Get(int id)
        {
            var row = await _specificationValueRepository.GetById(id, new[] { nameof(SpecificationValue.Part) });

            return row == null ? (ActionResult<SpecificationValue>) NotFound() : Ok(row);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] SpecificationValue entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _specificationValueRepository.Create(entity);
            await _unitOfWork.Save();

            return Ok();
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> Put(int id, [FromBody] SpecificationValue entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _specificationValueRepository.UpdateById(id, entity);

            if (result == null)
            {
                return NotFound();
            }

            await _unitOfWork.Save();

            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _specificationValueRepository.Delete(id);

            if (result == null)
            {
                return NotFound();
            }

            await _unitOfWork.Save();

            return Ok();
        }
    }
}