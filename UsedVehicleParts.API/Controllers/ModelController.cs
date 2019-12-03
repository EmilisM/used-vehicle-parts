using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UsedVehicleParts.API.DAL;
using UsedVehicleParts.API.DAL.Entities;

namespace UsedVehicleParts.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Model> _modelRepository;

        public ModelController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _modelRepository = _unitOfWork.GetRepository<Model>();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<Model>> Get([FromQuery] string name, [FromQuery] int? makeId)
        {
            Expression<Func<Model, bool>> filter = model =>
                (makeId == null || model.MakeId == makeId) &&
                (string.IsNullOrWhiteSpace(name) || model.Name != null && model.Name.ToLower().Contains(name.ToLower()));

            var models = await _modelRepository.Get(filter, new[] { nameof(Model.Make) });

            return Ok(models);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Model>> Get(int id)
        {
            var row = await _modelRepository.GetById(id, new[] { nameof(Model.Make) });

            return row == null ? (ActionResult<Model>) NotFound() : Ok(row);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Model>> Post([FromBody] Model entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _modelRepository.Create(entity);
            await _unitOfWork.Save();

            return Ok(entity);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Model>> Put(int id, [FromBody] Model entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _modelRepository.UpdateById(id, entity);

            if (result == null)
            {
                return NotFound();
            }

            await _unitOfWork.Save();

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Model>> Delete(int id)
        {
            var result = await _modelRepository.Delete(id);

            if (result == null)
            {
                return NotFound();
            }

            await _unitOfWork.Save();

            return Ok(result);
        }
    }
}