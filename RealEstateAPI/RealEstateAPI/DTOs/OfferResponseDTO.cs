namespace RealEstateAPI.DTOs
{
    public class OfferResponseDTO
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public int PropertyId { get; set; }
        public int UserId { get; set; }

        public decimal OriginalPrice { get; set; }
        public decimal PriceAfterOffer { get; set; }
    }

}
