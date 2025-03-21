using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.Models
{
    public class Image
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Url { get; set; }
        public int PropertyId { get; set; }
        public Property Property { get; set; }
    }
}
