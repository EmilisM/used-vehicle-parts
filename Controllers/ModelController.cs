using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UsedVehicleParts.Entities;

namespace UsedVehicleParts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelController : ControllerBase
    {
        private readonly UsedVehiclePartsContext _context;

        public ModelController(UsedVehiclePartsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<object>> Get()
        {
            return await _context.Model.Include(model => model.Make).ToListAsync();
        }

        [HttpGet("{id}")]
        public ActionResult<object> Get(int id)
        {
            return new { ID = id, Name = "CRX", ProductionYearFrom = DateTime.Now, ProductionYearTo = DateTime.Now };
        }

        [HttpPost]
        public ActionResult Post([FromBody] string value)
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