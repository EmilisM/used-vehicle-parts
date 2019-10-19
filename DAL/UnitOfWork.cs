using UsedVehicleParts.Entities;

namespace UsedVehicleParts.DAL
{
    public sealed class UnitOfWork : IUnitOfWork
    {
        private readonly UsedVehiclePartsContext _context;

        private Repository<Make> _makeRepository;
        private Repository<Model> _modelRepository;
        private Repository<Image> _imageRepository;
        private Repository<Part> _partRepository;
        private Repository<PartClass> _partClassRepository;
        private Repository<UserData> _userRepository;
        private Repository<Trim> _trimRepository;
        private Repository<SpecificationValue> _specificationValueRepository;

        public Repository<Make> MakeRepository =>
            _makeRepository ?? (_makeRepository = new Repository<Make>(_context));

        public Repository<Model> ModelRepository =>
            _modelRepository ?? (_modelRepository = new Repository<Model>(_context));

        public Repository<Image> ImageRepository =>
            _imageRepository ?? (_imageRepository = new Repository<Image>(_context));

        public Repository<Part> PartRepository =>
            _partRepository ?? (_partRepository = new Repository<Part>(_context));

        public Repository<PartClass> PartClassRepository =>
            _partClassRepository ?? (_partClassRepository = new Repository<PartClass>(_context));

        public Repository<UserData> UserRepository =>
            _userRepository ?? (_userRepository = new Repository<UserData>(_context));

        public Repository<Trim> TrimRepository =>
            _trimRepository ?? (_trimRepository = new Repository<Trim>(_context));

        public Repository<SpecificationValue> SpecificationValueRepository =>
            _specificationValueRepository ??
            (_specificationValueRepository = new Repository<SpecificationValue>(_context));

        public UnitOfWork(UsedVehiclePartsContext context)
        {
            _context = context;
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}