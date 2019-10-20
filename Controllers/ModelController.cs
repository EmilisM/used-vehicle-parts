using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UsedVehicleParts.DAL;
using UsedVehicleParts.Entities;

namespace UsedVehicleParts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly Repository<Model> _modelRepository;

        public ModelController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _modelRepository = _unitOfWork.GetRepository<Model>();
        }

        [HttpGet]
        public async Task<ActionResult<Model>> Get()
        {
            var models = await _modelRepository.Get(null, new[] { nameof(Model.Make) });

            return Ok(models);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Model>> Get(int id)
        {
            var row = await _modelRepository.GetById(id, new[] { nameof(Model.Make) });

            return row == null ? (ActionResult<Model>) NotFound() : Ok(row);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Model entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _modelRepository.Create(entity);
            await _unitOfWork.Save();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Model entity)
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

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _modelRepository.Delete(id);

            if (result == null)
            {
                return NotFound();
            }

            await _unitOfWork.Save();

            return Ok();
        }
    }
}