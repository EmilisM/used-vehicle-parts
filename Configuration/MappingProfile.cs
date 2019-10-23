using AutoMapper;
using UsedVehicleParts.DAL.Entities;

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