using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace UsedVehicleParts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleTypeController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<object>> GetVehicleType()
        {
            return new object[] { new { ID = 0, Name = "Car" }, new { ID = 1, Name = "Moto" } };
        }

        [HttpGet("{id}")]
        public ActionResult<object> GetVehicleType(int id)
        {
            return new { ID = id, Name = "Car" };
        }

        [HttpPost]
        public ActionResult PostVehicleType([FromBody] string value)
        {
            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult PutVehicleType(int id, [FromBody] string value)
        {
            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteVehicleType(int id)
        {
            return Ok();
        }
    }
}