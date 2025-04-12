using RealEstateAPI.DTOs;

namespace RealEstateAPI.Services
{
    public interface IPropertyOfferService
    {
        Task<OfferResponseDTO> CreateOffer(int userId, CreateOfferDTO dto);
        Task<IEnumerable<OfferResponseDTO>> GetOffersForProperty(int propertyId);
        Task<string> DeleteOffer(int offerId);
    }
}
