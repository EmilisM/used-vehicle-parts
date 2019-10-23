using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace UsedVehicleParts.Pages
{
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public abstract class ErrorModel : PageModel
    {
        protected ErrorModel(string requestId)
        {
            RequestId = requestId;
        }

        public string RequestId { get; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}