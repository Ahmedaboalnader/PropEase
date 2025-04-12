using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.DTOs
{
    public class CreateOfferDTO
    {
        [Required]
        [Range(0.01, (double)decimal.MaxValue)]
        public decimal Amount { get; set; }

        [Required]
        public int PropertyId { get; set; }
    }
}
