using UsedVehicleParts.Entities;

namespace UsedVehicleParts.DAL
{
    public interface IUnitOfWork
    {
        void Save();

        Repository<Make> MakeRepository { get; }
        Repository<Model> ModelRepository { get; }
        Repository<Image> ImageRepository { get; }
        Repository<Part> PartRepository { get; }
        Repository<Trim> TrimRepository { get; }
        Repository<PartClass> PartClassRepository { get; }
        Repository<UserData> UserRepository { get; }
        Repository<SpecificationValue> SpecificationValueRepository { get; }
    }
}