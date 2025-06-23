namespace RealEstateAPI.DTOs
{
    public class PropertyDetailsDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Location { get; set; }
        public double Area { get; set; }
        public int Rooms { get; set; }
        public int Bathrooms { get; set; }
        public string ListingType { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string PropertyType { get; set; }
        public string ViewType { get; set; }
        public string LocationType { get; set; }
        public string BuildingYear { get; set; }
        public bool Parking { get; set; }
        public bool Garden { get; set; }
        public List<string> Images { get; set; }
    }

}
