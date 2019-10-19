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

        public MakeController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Make>>> Get()
        {
            var makes = await _unitOfWork.MakeRepository.Get();

            return Ok(makes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Make>> Get(int id)
        {
            var row = await _unitOfWork.MakeRepository.GetById(id);

            return row == null ? (ActionResult<Make>) NotFound() : Ok(row);
        }

        [HttpPost]
        public ActionResult Post([FromBody] string name)
        {
            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] string value)
        {
            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return Ok();
        }
    }
}