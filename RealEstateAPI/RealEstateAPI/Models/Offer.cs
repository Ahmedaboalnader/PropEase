using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.Models
{
    public class Offer
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public double Amount { get; set; }
        public int PropertyId { get; set; }
        public Property Property { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
    }
}
