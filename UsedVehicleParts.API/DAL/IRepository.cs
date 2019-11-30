using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace UsedVehicleParts.API.DAL
{
    public interface IRepository<TEntity>
    {
        Task<IEnumerable<TEntity>> Get(Expression<Func<TEntity, bool>> filter = null,
            IEnumerable<string> includeProperties = null);

        Task<TEntity> GetById(int id, IEnumerable<string> includeProperties = null);

        Task<TEntity> GetById(string id, IEnumerable<string> includeProperties = null);

        Task Create(TEntity entity);

        Task<TEntity> UpdateById(int id, TEntity entity);

        void Update(TEntity entity);

        Task<TEntity> Delete(int id);
    }
}