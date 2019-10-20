using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace UsedVehicleParts.DAL
{
    public interface IRepository<TEntity>
    {
        Task<IEnumerable<TEntity>> Get(Expression<Func<TEntity, bool>> filter = null, string includeProperties = "");

        Task<TEntity> GetById(int id);

        Task Create(TEntity entity);

        Task<TEntity> UpdateById(int id, TEntity entity);

        void Update(TEntity entity);

        Task<TEntity> Delete(int id);
    }
}