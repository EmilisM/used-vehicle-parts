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
            string salt = _cryptographicService.GenerateSalt(length);

            double expectedLength = ExpectedSaltLength(length);

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
            string salt = _cryptographicService.GenerateSalt(length);

            double expectedLength = ExpectedSaltLength(CryptographicService.DefaultLength);

            Assert.AreEqual(expectedLength, salt.Length);
        }

        [Test]
        public void CryptographicService_GenerateSalt_GeneratesUniqueSalts()
        {
            string salt = _cryptographicService.GenerateSalt();

            string secondSalt = _cryptographicService.GenerateSalt();

            Assert.AreNotEqual(salt, secondSalt);
        }

        [Test]
        [TestCase(null)]
        [TestCase("")]
        public void CryptographicService_GenerateHash_HandlesNullOrEmptyPassword(string password)
        {
            const string salt = "c3RyaW5n";

            string result = null;

            Assert.DoesNotThrow(() => result = _cryptographicService.GenerateHash(password, salt));

            Assert.AreEqual(null, result);
        }

        [Test]
        [TestCase("1")]
        [TestCase("123")]
        [TestCase("1234567")]
        public void CryptographicService_GenerateHash_HandlesShortPassword(string password)
        {
            const string salt = "c3RyaW5n";

            string hash = _cryptographicService.GenerateHash(password, salt);

            Assert.AreEqual(null, hash);
        }

        [Test]
        [TestCase(null)]
        [TestCase("")]
        public void CryptographicService_GenerateHash_HandlesOnNullOrEmptySalt(string salt)
        {
            const string password = "randompassword";

            string hash = null;

            Assert.DoesNotThrow(() => hash = _cryptographicService.GenerateHash(password, salt));

            Assert.AreEqual(null, hash);
        }

        [Test]
        public void CryptographicService_GenerateHash_HandleSaltNotInBase64()
        {
            const string password = "randompassword";
            const string salt = "randomsalt";

            string hash = _cryptographicService.GenerateHash(password, salt);

            Assert.AreEqual(null, hash);
        }

        private static double ExpectedSaltLength(int length)
        {
            return 4 * Math.Ceiling((double) length / 3);
        }
    }
}