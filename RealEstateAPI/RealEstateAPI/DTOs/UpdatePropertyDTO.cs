using Microsoft.AspNetCore.Http;
using RealEstateAPI.Models;

namespace RealEstateAPI.DTOs
{
    public class UpdatePropertyDTO
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public string? Location { get; set; }
        public double? Area { get; set; }
        public int? Rooms { get; set; }
        public int? Bathrooms { get; set; }
        public ListingType ListingType { get; set; }

        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }

        public PropertyType? PropertyType { get; set; }
        public ViewType?  ViewType { get; set; }
        public Location? LocationType { get; set; }
        public BuildingYear? BuildingYear { get; set; }
        public bool? Parking { get; set; }
        public bool? Garden { get; set; }

        public List<IFormFile>? Images { get; set; }
    }
}
