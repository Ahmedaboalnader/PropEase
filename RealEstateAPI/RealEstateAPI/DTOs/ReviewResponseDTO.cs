namespace RealEstateAPI.DTOs
{
    public class ReviewResponseDTO
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public int PropertyId { get; set; }
        public int UserId { get; set; }
    }
}
