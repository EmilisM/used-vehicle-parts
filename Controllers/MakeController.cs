using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UsedVehicleParts.Entities;

namespace UsedVehicleParts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MakeController : ControllerBase
    {
        private readonly UsedVehiclePartsContext _context;

        public MakeController(UsedVehiclePartsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Make>>> Get()
        {
            return await _context.Make.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Make>> Get(int id)
        {
            return await _context.Make.FindAsync(id);
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