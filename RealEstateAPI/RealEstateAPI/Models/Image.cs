using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.Models
{
    public class Image
    {
        public int Id { get; set; }

        [Required]
        public string FileName { get; set; } = string.Empty;

        public int PropertyId { get; set; }
        public Property? Property { get; set; }
    }
}
