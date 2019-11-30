using System;

namespace UsedVehicleParts.API.Services
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