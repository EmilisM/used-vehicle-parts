using System;

namespace UsedVehicleParts.Entities
{
    public class Trim
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? ProductionYearFrom { get; set; }
        public DateTime? ProductionYearTo { get; set; }
        public int ModelId { get; set; }

        public virtual Model Model { get; set; }
    }
}