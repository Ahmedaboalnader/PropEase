using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.DTOs
{
    public class CreatePropertyDTO
    {
        [Required, MaxLength(255)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Range(0, (double)decimal.MaxValue, ErrorMessage = "Price must be zero or greater.")]
        public decimal Price { get; set; }


        [Required, MaxLength(255)]
        public string Location { get; set; } = string.Empty;
    }
}
