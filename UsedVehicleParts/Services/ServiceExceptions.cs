using System;

// ReSharper disable StyleCop.SA1402
namespace UsedVehicleParts.Services
{
    public class UsernameTakenException : Exception
    {
    }

    public class UsernameOrPasswordInvalidException : Exception
    {
    }

    public class RegistrationException : Exception
    {
    }

    public class ConfigurationMissingException : Exception
    {
    }
}