using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace UsedVehicleParts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MakeController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<object>> Get()
        {
            return new object[]
            {
                new { ID = 0, Name = "Honda", YearFounded = DateTime.Now },
                new { ID = 1, Name = "Honda", YearFounded = DateTime.Now }
            };
        }

        [HttpGet("{id}")]
        public ActionResult<object> Get(int id)
        {
            return new { ID = id, Name = "Honda", YearFounded = DateTime.Now };
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