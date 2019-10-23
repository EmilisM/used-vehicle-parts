namespace UsedVehicleParts.DAL.Entities
{
    public class SpecificationValue : Entity
    {
        public string Name { get; set; }
        public string Value { get; set; }
        public string Units { get; set; }
        public int PartId { get; set; }

        public virtual Part Part { get; set; }
    }
}