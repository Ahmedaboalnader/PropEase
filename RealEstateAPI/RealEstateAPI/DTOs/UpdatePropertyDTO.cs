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

        public List<IFormFile>? Images { get; set; } 
    }
}
