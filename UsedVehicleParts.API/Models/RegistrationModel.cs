using System.ComponentModel.DataAnnotations;

namespace UsedVehicleParts.API.Models
{
    public class RegistrationModel
    {
        [Required] [EmailAddress] public string Email { get; set; }

        [Required] public string Password { get; set; }

        [Required] [Compare("Password", ErrorMessage = "Passwords do not match.")] public string RepeatPassword { get; set; }
    }
}
