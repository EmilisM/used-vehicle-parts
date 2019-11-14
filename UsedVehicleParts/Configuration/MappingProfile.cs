using AutoMapper;

using UsedVehicleParts.DAL.Entities;

namespace UsedVehicleParts.Configuration
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Make, Make>();
            CreateMap<Model, Model>();
            CreateMap<PartClass, PartClass>();
            CreateMap<Part, Part>();
            CreateMap<Trim, Trim>();
            CreateMap<SpecificationValue, SpecificationValue>();
        }
    }
}