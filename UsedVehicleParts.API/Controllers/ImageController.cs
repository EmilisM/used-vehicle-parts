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
    public class ImageController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Image> _imageRepository;

        public ImageController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _imageRepository = _unitOfWork.GetRepository<Image>();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Image>>> Get()
        {
            var makes = await _imageRepository.Get();

            return Ok(makes);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Image>> Get(int id)
        {
            var row = await _imageRepository.GetById(id);

            return row == null ? (ActionResult<Image>) NotFound() : Ok(row);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Image>> Post([FromBody] Image value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _imageRepository.Create(value);
            await _unitOfWork.Save();

            return Ok(value);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Image>> Put(int id, [FromBody] Image value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _imageRepository.UpdateById(id, value);

            if (result == null)
            {
                return NotFound();
            }

            await _unitOfWork.Save();

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Image>> Delete(int id)
        {
            var result = await _imageRepository.Delete(id);

            if (result == null)
            {
                return NotFound();
            }

            await _unitOfWork.Save();

            return Ok(result);
        }
    }
}