using System;
using System.Security.Cryptography;
using NUnit.Framework;
using UsedVehicleParts.Services;

namespace UsedVehicleParts.Tests.Services
{
    [TestFixture]
    public class CryptographicServiceTests
    {
        private ICryptographicService _cryptographicService;

        [SetUp]
        public void CryptographicServiceSetUp()
        {
            var rngCryptoServiceProvider = new RNGCryptoServiceProvider();
            _cryptographicService = new CryptographicService(rngCryptoServiceProvider);
        }

        [Test]
        [TestCase(10)]
        [TestCase(50)]
        [TestCase(100)]
        public void CryptographicService_GenerateSalt_ReturnsCorrectLength(int length)
        {
            var salt = _cryptographicService.GenerateSalt(length);

            var expectedLength = ExpectedSaltLength(length);

            Assert.AreEqual(expectedLength, salt.Length);
        }

        [Test]
        [TestCase(0)]
        [TestCase(-1)]
        public void CryptographicService_GenerateSalt_NotThrowOnNegativeOrZeroLength(int length)
        {
            Assert.DoesNotThrow(() => _cryptographicService.GenerateSalt(length));
        }

        [Test]
        [TestCase(0)]
        [TestCase(-1)]
        public void CryptographicService_GenerateSalt_FallbackToDefaultOnNegativeOrZeroLength(int length)
        {
            var salt = _cryptographicService.GenerateSalt(length);

            var expectedLength = ExpectedSaltLength(CryptographicService.DefaultLength);

            Assert.AreEqual(expectedLength, salt.Length);
        }

        private static double ExpectedSaltLength(int length)
        {
            return 4 * Math.Ceiling((double) length / 3);
        }
    }
}