using System;

namespace UsedVehicleParts.API.Services
{
    public class EmailTakenException : Exception
    {
    }

    public class EmailOrPasswordInvalidException : Exception
    {
    }

    public class RegistrationException : Exception
    {
    }

    public class ConfigurationMissingException : Exception
    {
    }
}