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

        // بيانات الوسيط العقاري
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;

        // Highlights
        public PropertyType PropertyType { get; set; }
        public ViewType ViewType { get; set; }
        public Location LocationType { get; set; }
        public BuildingYear BuildingYear { get; set; }
        public bool Parking { get; set; }
        public bool Garden { get; set; }

        public List<string> Images { get; set; } = new();
    }


}
