using System.Runtime.Serialization;

namespace UsedVehicleParts.API.DAL.Entities
{
    public class UserData : Entity
    {
        public string Email { get; set; }
        public int? Reputation { get; set; }
        public string ContactPhone { get; set; }

        [IgnoreDataMember]
        public string PasswordSalt { get; set; }
        [IgnoreDataMember]
        public string PasswordHash { get; set; }
    }
}