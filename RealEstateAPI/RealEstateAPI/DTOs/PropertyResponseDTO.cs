using RealEstateAPI.Models;

namespace RealEstateAPI.DTOs
{
    public class PropertyResponseDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Location { get; set; } = string.Empty;
        public double Area { get; set; }
        public int Rooms { get; set; }
        public int Bathrooms { get; set; }
        public int UserId { get; set; }
        public ListingType ListingType { get; set; }
        public List<string> Images{ get; set; } = new();
    }
}
