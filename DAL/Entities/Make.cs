using System;

namespace UsedVehicleParts.DAL.Entities
{
    public class Make : Entity
    {
        public string Name { get; set; }
        public DateTime? YearFounded { get; set; }
    }
}