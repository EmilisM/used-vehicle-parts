using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using UsedVehicleParts.DAL.Entities;

namespace UsedVehicleParts.DAL
{
    public sealed class UnitOfWork : IUnitOfWork
    {
        private readonly UsedVehiclePartsContext _context;
        private readonly IMapper _mapper;

        private Dictionary<string, object> _repositories;

        public UnitOfWork(UsedVehiclePartsContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IRepository<TEntity> GetRepository<TEntity>() where TEntity : Entity
        {
            if (_repositories == null)
            {
                _repositories = new Dictionary<string, object>();
            }

            var repositoryName = typeof(TEntity).Name;

            if (_repositories.ContainsKey(repositoryName))
            {
                return (Repository<TEntity>) _repositories[repositoryName];
            }

            var repository = new Repository<TEntity>(_context, _mapper);

            _repositories.Add(repositoryName, repository);

            return repository;
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}