using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.Models
{
    public class Property
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public string Location { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
