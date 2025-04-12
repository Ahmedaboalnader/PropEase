using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.DTOs
{
    public class CreateReviewDTO
    {
        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }

        [MaxLength(1000)]
        public string? Comment { get; set; }

        [Required]
        public int PropertyId { get; set; }
    }
}
