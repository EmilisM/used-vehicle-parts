using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using UsedVehicleParts.Entities;

namespace UsedVehicleParts.DAL
{
    public sealed class Repository<TEntity> : IRepository<TEntity> where TEntity : Entity
    {
        private readonly DbSet<TEntity> _dbSet;
        private readonly IMapper _mapper;

        public Repository(UsedVehiclePartsContext context, IMapper mapper)
        {
            _mapper = mapper;
            _dbSet = context.Set<TEntity>();
        }

        public async Task<IEnumerable<TEntity>> Get(Expression<Func<TEntity, bool>> filter = null,
            string includeProperties = "")
        {
            IQueryable<TEntity> query = _dbSet;

            if (filter != null) query = query.Where(filter);

            string[] includePropertyList =
                includeProperties.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            query = includePropertyList.Aggregate(query,
                (current, includeProperty) => current.Include(includeProperty));

            return await query.ToListAsync();
        }

        public async Task<TEntity> GetById(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task Create(TEntity entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public async Task<TEntity> UpdateById(int id, TEntity entity)
        {
            var entry = await _dbSet.FindAsync(id);

            if (entry == null)
            {
                return null;
            }

            _mapper.Map(entity, entry);
            entry.Id = id;

            return entry;
        }

        public void Update(TEntity entity)
        {
            _dbSet.Update(entity);
        }

        public async Task<TEntity> Delete(int id)
        {
            var entity = await _dbSet.FindAsync(id);

            if (entity == null)
            {
                return null;
            }

            _dbSet.Remove(entity);

            return entity;
        }
    }
}