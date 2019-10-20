using System;

namespace UsedVehicleParts.Entities
{
    public class Make : Entity
    {
        public string Name { get; set; }
        public DateTime? YearFounded { get; set; }
    }
}