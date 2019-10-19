namespace UsedVehicleParts.Entities
{
    public class SpecificationValue
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public string Units { get; set; }
        public int PartId { get; set; }

        public virtual Part Part { get; set; }
    }
}