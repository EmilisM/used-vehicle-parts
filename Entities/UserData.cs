namespace UsedVehicleParts.Entities
{
    public class UserData
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordSalt { get; set; }
        public string PasswordHash { get; set; }
        public int? Reputation { get; set; }
        public string Email { get; set; }
        public string ContactPhone { get; set; }
    }
}