using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealEstateAPI.DTOs;
using RealEstateAPI.Services;
using System.Security.Claims;

namespace RealEstateAPI.Controllers
{
    [Route("api/offers")]
    [ApiController]
    public class OfferController : ControllerBase
    {
        private readonly IPropertyOfferService _offerService;

        public OfferController(IPropertyOfferService offerService)
        {
            _offerService = offerService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateOffer([FromBody] CreateOfferDTO dto)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();

            var offer = await _offerService.CreateOffer(userId.Value, dto);
            return Ok(offer);
        }

        [HttpGet("property/{propertyId}")]
        public async Task<IActionResult> GetOffersForProperty(int propertyId)
        {
            var offers = await _offerService.GetOffersForProperty(propertyId);
            return Ok(offers);
        }

        private int? GetUserId()
        {
            var userIdClaim = User.FindFirst("UserId")?.Value
                ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return int.TryParse(userIdClaim, out int userId) ? userId : (int?)null;
        }
        [HttpDelete("{offerId}")]
        public async Task<IActionResult> DeleteOffer(int offerId)
        {
            var message = await _offerService.DeleteOffer(offerId);

            if (message == "Offer not found.")
                return NotFound(message);

            return Ok(new { message });
        }


    }
}
