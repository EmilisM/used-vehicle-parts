using System.Threading.Tasks;
using AutoMapper;
using Moq;
using NUnit.Framework;
using UsedVehicleParts.DAL;
using UsedVehicleParts.DAL.Entities;

namespace UsedVehicleParts.Tests.DAL
{
    [TestFixture]
    public class RepositoryTests
    {
        private Mock<UsedVehiclePartsContext> _context;
        private Mock<IMapper> _mapper;

        [SetUp]
        public void RepositoryTestsSetUp()
        {
            _context = new Mock<UsedVehiclePartsContext>();
            _mapper = new Mock<IMapper>();
        }

        [Test]
        [TestCase("")]
        [TestCase(null)]
        [TestCase("-1")]
        public async Task Repository_GetById_RetursNullOnInvalidStringId(string id)
        {
            var repository = new Repository<Entity>(_context.Object, _mapper.Object);

            var result = await repository.GetById(id);

            Assert.IsNull(result);
        }

        [Test]
        [TestCase(-1)]
        public async Task Repository_GetById_RetursNullOnInvalidIntId(int id)
        {
            var repository = new Repository<Entity>(_context.Object, _mapper.Object);

            var result = await repository.GetById(id);

            Assert.IsNull(result);
        }

        [Test]
        [TestCase(-1)]
        public async Task Repository_UpdateById_RetursNullOnInvalidId(int id)
        {
            var repository = new Repository<Entity>(_context.Object, _mapper.Object);

            var entity = new UserData();
            var result = await repository.UpdateById(id, entity);

            Assert.IsNull(result);
        }

        [Test]
        [TestCase(-1)]
        public async Task Repository_Delete_RetursNullOnInvalidId(int id)
        {
            var repository = new Repository<Entity>(_context.Object, _mapper.Object);

            var result = await repository.Delete(id);

            Assert.IsNull(result);
        }
    }
}