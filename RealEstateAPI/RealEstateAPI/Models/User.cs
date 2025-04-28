using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RealEstateAPI.Models
{
    public class User 
    {
        public int Id { get; set; }

        [Required, MinLength(3), MaxLength(50)]
        public string Name { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required, MinLength(10), MaxLength(15)]
        public string PhoneNumber { get; set; }

        [Required]
        [JsonIgnore]
        public string PasswordHash { get; set; }

        public string Role { get; set; } = "User";

        public string? OTP { get; set; }   
        public DateTime? OTPExpiry { get; set; }   
        public DateTime? LastOtpSent { get; set; }   
        public bool? IsResetOtpVerified { get; set; }  
        public bool IsEmailConfirmed { get; set; } = false;   
        public string? RefreshToken { get; set; }   
        public DateTime? RefreshTokenExpiry { get; set; }  
    }


}
