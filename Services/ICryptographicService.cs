namespace UsedVehicleParts.Services
{
    public interface ICryptographicService
    {
        string GenerateSalt(int length = 32);
        string GenerateHash(string password, string saltInBase64);
    }
}