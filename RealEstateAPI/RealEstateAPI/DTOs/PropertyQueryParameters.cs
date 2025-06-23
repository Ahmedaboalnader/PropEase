using RealEstateAPI.Models;

namespace RealEstateAPI.DTOs
{
    public class PropertyQueryParameters
    {
        public string? SearchTerm { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public int? MinRooms { get; set; }
        public int? MinBathrooms { get; set; }
        public int? MinArea { get; set; }
        public string? Location { get; set; }
        public PropertyType? PropertyType { get; set; }

        public ListingType? ListingType { get; set; }
    }
}
