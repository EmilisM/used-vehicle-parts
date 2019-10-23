namespace UsedVehicleParts.DAL.Entities
{
    public class UserData : Entity
    {
        public string Username { get; set; }
        public string PasswordSalt { get; set; }
        public string PasswordHash { get; set; }
        public int? Reputation { get; set; }
        public string Email { get; set; }
        public string ContactPhone { get; set; }
    }
}