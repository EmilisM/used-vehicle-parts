using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Moq;
using NUnit.Framework;
using UsedVehicleParts.DAL;
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
        public void UserService_CreateClaimsIdentity_ThrowsOnNullOrEmptyUserId(string userId)
        {
            Assert.Throws<ArgumentNullException>(() => _userService.CreateClaims(userId));
        }

        [Test]
        public void UserService_CreateClaimsIdentity_SetsUserIdAsClaimTypeName()
        {
            const string userId = "120";
            var claims = _userService.CreateClaims(userId).ToList();

            Assert.IsNotNull(claims);
            Assert.AreEqual(claims.Count, 1);

            var singleClaim = claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);

            Assert.IsNotNull(singleClaim);
            Assert.AreEqual(singleClaim.Value, userId);
        }
    }
}