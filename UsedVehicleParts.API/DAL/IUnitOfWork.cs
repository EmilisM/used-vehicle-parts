using System.Threading.Tasks;
using UsedVehicleParts.API.DAL.Entities;

namespace UsedVehicleParts.API.DAL
{
    public interface IUnitOfWork
    {
        Task Save();
        IRepository<TEntity> GetRepository<TEntity>() where TEntity : Entity;
    }
}