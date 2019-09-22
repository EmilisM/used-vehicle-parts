using Microsoft.AspNetCore.Mvc;

namespace UsedVehicleParts.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        public string GetTest()
        {
            return "value";
        }
    }
}