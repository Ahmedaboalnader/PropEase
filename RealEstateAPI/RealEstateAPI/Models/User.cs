using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        public string Role { get; set; } = "User";

        public string? OTP { get; set; }
        public DateTime? OTPExpiry { get; set; }
        public bool IsEmailConfirmed { get; set; } = false;

    }
}
