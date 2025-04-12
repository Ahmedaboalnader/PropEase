using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RealEstateAPI.Models
{
    public class Property
    {
        public int Id { get; set; }

        [Required, MaxLength(255)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [Required, MaxLength(255)]
        public string Location { get; set; } = string.Empty;

        [Required]
        public double Area { get; set; } 

        [Required]
        public int Rooms { get; set; } 

        [Required]
        public int Bathrooms { get; set; }

        public int UserId { get; set; }

        public List<Image> Images { get; set; } = new();
    }
}
