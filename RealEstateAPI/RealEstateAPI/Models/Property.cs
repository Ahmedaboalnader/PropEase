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

        [Required]
        public ListingType ListingType { get; set; }

        public int UserId { get; set; }

        public List<Image> Images { get; set; } = new();


        [Required, MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required, MaxLength(255)]
        public string Address { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string Phone { get; set; } = string.Empty;

     

        [Required]
        public PropertyType PropertyType { get; set; }

        [Required]
        public ViewType ViewType { get; set; }

        [Required]
        public Location LocationType { get; set; }

        [Required]
        public BuildingYear BuildingYear { get; set; }

        public bool Parking { get; set; }

        public bool Garden { get; set; }
    }

   

    public enum PropertyType
    {
        Commercial,
        Chalets,
        Land,
        SingleFamily,
        Studio,
        TownHouse,
        Apartment,
        ModernVillas
    }

    public enum ViewType
    {
        SeaView,
        GardenView,
        PoolView,
        CityView,
        MountainView
    }

    public enum Location
    {
        Downtown,
        Suburbs,
        CoastalArea,
        Countryside,
        BusinessDistrict
    }

    public enum BuildingYear
    {
        Year2025,
        Year2024,
        Year2023,
        Year2022,
        Year2021,
        Year2020,
        Year2019,
        Year2018,
        Year2017,
        Year2016
    }
}
