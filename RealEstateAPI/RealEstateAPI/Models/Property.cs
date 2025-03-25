using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RealEstateAPI.Models
{
    public class Property
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(255)]
        public string Title { get; set; } = string.Empty;

        [Required, Column(TypeName = "text")]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [Required, MaxLength(255)]
        public string Location { get; set; } = string.Empty;

        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }

        public User User { get; set; } = null!;
    }
}
