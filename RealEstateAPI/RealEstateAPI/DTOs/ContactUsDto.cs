using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.Dtos
{
    public class ContactUsDto
    {
        [Required, MaxLength(100)]
        public string Name { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required, MaxLength(20)]
        public string PhoneNumber { get; set; }

        [Required, MaxLength(150)]
        public string Subject { get; set; }

        [Required, MaxLength(1000)]
        public string Message { get; set; }
    }
}
