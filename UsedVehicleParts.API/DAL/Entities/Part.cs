using System;

namespace UsedVehicleParts.API.DAL.Entities
{
    public class Part : Entity
    {
        public string Name { get; set; }
        public DateTime? ProductionYearStart { get; set; }
        public DateTime? ProductionYearEnd { get; set; }
        public string Manufacturer { get; set; }
        public int QualityGrade { get; set; }
        public int Price { get; set; }
        public string PriceUnits { get; set; }
        public string PartNumber { get; set; }
        public int PartClassId { get; set; }
        public int ImageId { get; set; }
        public int TrimId { get; set; }
        public int BuyerId { get; set; }
        public int SellerId { get; set; }

        public virtual UserData Buyer { get; set; }
        public virtual Image Image { get; set; }
        public virtual PartClass PartClass { get; set; }
        public virtual UserData Seller { get; set; }
        public virtual Trim Trim { get; set; }
    }
}