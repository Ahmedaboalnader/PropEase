using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public int PropertyId { get; set; }
        public Property Property { get; set; }
        public int? UserId { get; set; }  
        public User? User { get; set; }
    }
}
