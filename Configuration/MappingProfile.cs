using AutoMapper;
using UsedVehicleParts.Entities;

namespace UsedVehicleParts.Configuration
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Make, Make>();
        }
    }
}