using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using RealEstateAPI.Models;

namespace RealEstateAPI.DTOs
{
    public class CreatePropertyDTO
    {
        [Required, MaxLength(255)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public decimal Price { get; set; }

        [Required, MaxLength(255)]
        public string Location { get; set; } = string.Empty;

        [Required]
        public double Area { get; set; }

        [Required]
        public int Rooms { get; set; }

        [Required]
        public int Bathrooms { get; set; }

        public ListingType ListingType { get; set; }

     
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;

        
        public PropertyType PropertyType { get; set; }
        public ViewType ViewType { get; set; }
        public Location LocationType { get; set; }
        public BuildingYear BuildingYear { get; set; }

        public bool Parking { get; set; }
        public bool Garden { get; set; }

        public List<IFormFile> Images { get; set; } = new();
    }
}
