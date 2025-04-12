using Microsoft.EntityFrameworkCore;
using RealEstateAPI.Data;
using RealEstateAPI.DTOs;
using RealEstateAPI.Models;

namespace RealEstateAPI.Services
{
    public class PropertyOfferService : IPropertyOfferService
    {
        private readonly AppDbContext _context;

        public PropertyOfferService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<OfferResponseDTO> CreateOffer(int userId, CreateOfferDTO dto)
        {
            var property = await _context.Properties.FindAsync(dto.PropertyId);
            if (property == null)
                throw new Exception("Property not found");

            var offer = new Offer
            {
                Amount = dto.Amount,
                PropertyId = dto.PropertyId,
                UserId = userId
            };

            _context.Offers.Add(offer);
            await _context.SaveChangesAsync();

            return new OfferResponseDTO
            {
                Id = offer.Id,
                Amount = offer.Amount,
                PropertyId = offer.PropertyId,
                UserId = offer.UserId,
                OriginalPrice = property.Price,
                PriceAfterOffer = property.Price - offer.Amount
            };
        }


        public async Task<IEnumerable<OfferResponseDTO>> GetOffersForProperty(int propertyId)
        {
            var property = await _context.Properties.FindAsync(propertyId);
            if (property == null)
                throw new Exception("Property not found");

            return await _context.Offers
                .Where(o => o.PropertyId == propertyId)
                .Select(o => new OfferResponseDTO
                {
                    Id = o.Id,
                    Amount = o.Amount,
                    PropertyId = o.PropertyId,
                    UserId = o.UserId,
                    OriginalPrice = property.Price,
                    PriceAfterOffer = property.Price - o.Amount
                }).ToListAsync();
        }

        public async Task<string> DeleteOffer(int offerId)
        {
            var offer = await _context.Offers.FindAsync(offerId);
            if (offer == null)
                return "Offer not found.";

            _context.Offers.Remove(offer);
            await _context.SaveChangesAsync();

            return "Offer deleted successfully.";
        }


    }
}
