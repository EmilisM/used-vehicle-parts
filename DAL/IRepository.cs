using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace UsedVehicleParts.DAL
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<IEnumerable<TEntity>> Get(Expression<Func<TEntity, bool>> filter = null, string includeProperties = "");

        Task<TEntity> GetById(object id);

        Task Create(TEntity entity);

        void Update(TEntity entity);

        Task Delete(int id);
    }
}