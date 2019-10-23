using System;

namespace UsedVehicleParts.DAL.Entities
{
    public class Trim : Entity
    {
        public string Name { get; set; }
        public DateTime? ProductionYearFrom { get; set; }
        public DateTime? ProductionYearTo { get; set; }
        public int ModelId { get; set; }

        public virtual Model Model { get; set; }
    }
}