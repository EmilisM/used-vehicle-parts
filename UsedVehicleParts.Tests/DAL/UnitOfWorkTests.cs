using AutoMapper;
using Moq;
using NUnit.Framework;
using UsedVehicleParts.DAL;
using UsedVehicleParts.DAL.Entities;

namespace UsedVehicleParts.Tests.DAL
{
    [TestFixture]
    public class UnitOfWorkTests
    {
        private IUnitOfWork _unitOfWork;

        [SetUp]
        public void UnitOfWorkSetUp()
        {
            var context = new Mock<UsedVehiclePartsContext>();
            var mapper = new Mock<IMapper>();

            _unitOfWork = new UnitOfWork(context.Object, mapper.Object);
        }

        [Test]
        public void UnitOfWork_GetRepository_ReturnsExistingRepositoryIfPresent()
        {
            var repositoryExpected = _unitOfWork.GetRepository<UserData>();
            var repositoryActual = _unitOfWork.GetRepository<UserData>();

            Assert.AreSame(repositoryExpected, repositoryActual);
        }
    }
}