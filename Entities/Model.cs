using System;

namespace UsedVehicleParts.Entities
{
    public class Model
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? ProductionYearFrom { get; set; }
        public DateTime? ProductionYearTo { get; set; }
        public int MakeId { get; set; }

        public virtual Make Make { get; set; }
    }
}