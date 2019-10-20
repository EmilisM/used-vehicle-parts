using System;

namespace UsedVehicleParts.Entities
{
    public class Model : Entity
    {
        public string Name { get; set; }
        public DateTime? ProductionYearFrom { get; set; }
        public DateTime? ProductionYearTo { get; set; }
        public int MakeId { get; set; }

        public virtual Make Make { get; set; }
    }
}