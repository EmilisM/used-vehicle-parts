﻿using System.Threading.Tasks;
using UsedVehicleParts.Entities;

namespace UsedVehicleParts.DAL
{
    public interface IUnitOfWork
    {
        Task Save();
        Repository<TEntity> GetRepository<TEntity>() where TEntity : Entity;
    }
}