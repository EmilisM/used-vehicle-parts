using System;

namespace UsedVehicleParts.API.DAL.Entities
{
    public class Make : Entity
    {
        public string Name { get; set; }
        public DateTime? YearFounded { get; set; }
    }
}