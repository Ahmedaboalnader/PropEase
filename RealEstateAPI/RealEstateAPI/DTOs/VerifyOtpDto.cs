using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.DTOs
{
    public class VerifyOtpDto
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string OTP { get; set; }
    }
}
