namespace UsedVehicleParts.API.Models
{
    public class ErrorResponseModel
    {
        public ErrorResponseModel(string error)
        {
            Error = error;
        }

        public string Error { get; }
    }
}
