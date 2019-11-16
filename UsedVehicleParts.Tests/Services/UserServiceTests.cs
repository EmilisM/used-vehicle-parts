using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Moq;
using NUnit.Framework;
using UsedVehicleParts.DAL;
using UsedVehicleParts.DAL.Entities;
using UsedVehicleParts.Services;

namespace UsedVehicleParts.Tests.Services
{
    [TestFixture]
    public class UserServiceTests
    {
        private IUserService _userService;

        private Mock<IUnitOfWork> _unitOfWork;
        private Mock<IConfiguration> _configuration;
        private Mock<ICryptographicService> _cryptographicService;

        [SetUp]
        public void UserServiceTestsSetUp()
        {
            _unitOfWork = new Mock<IUnitOfWork>();
            _configuration = new Mock<IConfiguration>();
            _cryptographicService = new Mock<ICryptographicService>();

            _userService = new UserService(_unitOfWork.Object, _configuration.Object, _cryptographicService.Object);
        }

        [Test]
        [TestCase("")]
        [TestCase(null)]
        public void UserService_CreateClaims_ThrowsOnNullOrEmptyUserId(string userId)
        {
            Assert.Throws<ArgumentNullException>(() => _userService.CreateClaims(userId));
        }

        [Test]
        public void UserService_CreateClaims_SetsUserIdAsClaimTypeNameIdentifier()
        {
            const string userId = "120";
            var claims = _userService.CreateClaims(userId).ToList();

            Assert.IsNotNull(claims);
            Assert.AreEqual(claims.Count, 1);

            var singleClaim = claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);

            Assert.IsNotNull(singleClaim);
            Assert.AreEqual(singleClaim.Value, userId);
        }

        [Test]
        [TestCase("")]
        [TestCase(null)]
        public void UserService_CreateJwtToken_ThrowsOnNullOrEmptyUserId(string userId)
        {
            Assert.Throws<ArgumentNullException>(() =>
                _userService.CreateJwtToken(userId, DateTime.Now.AddMinutes(30)));
        }

        [Test]
        public void UserService_CreateJwtToken_ThrowsOnConfigurationNotFound()
        {
            _configuration.Setup(config => config["JWTSecret"]).Returns(value: null);
            Assert.Throws<ConfigurationMissingException>(() =>
                _userService.CreateJwtToken("1", DateTime.Now.AddMinutes(30)));
        }

        [Test]
        public void UserService_CreateJwtToken_ThrowsOnInvaidExpiryDate()
        {
            Assert.Throws<ArgumentException>(() => _userService.CreateJwtToken("1", DateTime.Now));
        }

        [Test]
        [TestCase(null, null)]
        [TestCase("", "")]
        [TestCase(null, "")]
        [TestCase("", null)]
        [TestCase("usr", "1234567")]
        [TestCase(null, "1234567")]
        [TestCase("123", null)]
        public void UserService_Authenticate_ThrowsOnEmptyOrNullPasswordOrUsername(string username, string password)
        {
            Assert.ThrowsAsync<UsernameOrPasswordInvalidException>(() => _userService.AuthenticateAsync(username, password));
        }

        [Test]
        public void UserService_Authenticate_ThrowsOnUserNotFound()
        {
            var repository = new Mock<IRepository<UserData>>();

            _unitOfWork.Setup(work => work.GetRepository<UserData>()).Returns(repository.Object);

            repository.Setup(repo => repo.Get(null, null)).ReturnsAsync(value: null);

            _userService = new UserService(_unitOfWork.Object, _configuration.Object, _cryptographicService.Object);

            Assert.ThrowsAsync<UsernameOrPasswordInvalidException>(() =>
                _userService.AuthenticateAsync("username", "password"));
        }

        [Test]
        public void UserService_Authenticate_ThrowsOnHashMismatch()
        {
            var repository = new Mock<IRepository<UserData>>();

            _unitOfWork.Setup(work => work.GetRepository<UserData>()).Returns(repository.Object);

            repository.Setup(repo => repo.Get(It.IsAny<Expression<Func<UserData, bool>>>(), null)).ReturnsAsync(new List<UserData>
            {
                new UserData
                {
                    PasswordHash = "onetwo"
                }
            });

            _cryptographicService.Setup(cryptoService => cryptoService.GenerateHash("", "")).Returns("onefour");

            _userService = new UserService(_unitOfWork.Object, _configuration.Object, _cryptographicService.Object);

            Assert.ThrowsAsync<UsernameOrPasswordInvalidException>(() =>
                _userService.AuthenticateAsync("username", "password"));
        }

        [Test]
        [TestCase(null, null)]
        [TestCase("", "")]
        [TestCase(null, "")]
        [TestCase("", null)]
        [TestCase("usr", "1234567")]
        [TestCase(null, "1234567")]
        [TestCase("123", null)]
        public void UserService_Registrate_ThrowsOnEmptyOrNullPasswordOrUsername(string username, string password)
        {
            Assert.ThrowsAsync<UsernameOrPasswordInvalidException>(() => _userService.RegistrateAsync(username, password));
        }

        [Test]
        public void UserService_Registrate_ThrowsOnUserFound()
        {
            var repository = new Mock<IRepository<UserData>>();

            _unitOfWork.Setup(work => work.GetRepository<UserData>()).Returns(repository.Object);

            repository.Setup(repo => repo.Get(It.IsAny<Expression<Func<UserData, bool>>>(), null)).ReturnsAsync(
                new List<UserData>
                {
                    new UserData
                    {
                        Username = "username"
                    }
                });

            _userService = new UserService(_unitOfWork.Object, _configuration.Object, _cryptographicService.Object);

            Assert.ThrowsAsync<UsernameTakenException>(() =>
                _userService.RegistrateAsync("username", "password"));
        }
    }
}