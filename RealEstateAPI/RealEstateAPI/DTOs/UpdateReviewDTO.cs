using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.DTOs
{
    public class UpdateReviewDTO
    {
        [Range(1, 5)]
        public int? Rating { get; set; }

        [MaxLength(1000)]
        public string? Comment { get; set; }
    }
}
