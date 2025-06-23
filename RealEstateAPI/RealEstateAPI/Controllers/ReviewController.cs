using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealEstateAPI.DTOs;
using RealEstateAPI.Services;
using System.Security.Claims;

namespace RealEstateAPI.Controllers
{
    [Route("api/reviews")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public ReviewController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

       
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateReview([FromBody] CreateReviewDTO reviewDto)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();

            var newReview = await _reviewService.CreateReview(userId.Value, reviewDto);
            return CreatedAtAction(nameof(GetReviewsByProperty), new { propertyId = reviewDto.PropertyId }, newReview);
        }

       
        [HttpGet("property/{propertyId}")]
        public async Task<IActionResult> GetReviewsByProperty(int propertyId)
        {
            var reviews = await _reviewService.GetReviewsByProperty(propertyId);
            return Ok(reviews);
        }

      
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateReview(int id, [FromBody] UpdateReviewDTO reviewDto)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();

            var updatedReview = await _reviewService.UpdateReview(id, userId.Value, reviewDto);
            if (updatedReview == null) return NotFound();

            return Ok(updatedReview);
        }

       
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var userId = GetUserId();
            if (userId == null) return Unauthorized();

            var isDeleted = await _reviewService.DeleteReview(id, userId.Value);
            if (!isDeleted) return NotFound();

            return NoContent();
        }

        
        private int? GetUserId()
        {
            var userIdClaim = User.FindFirst("UserId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
            {
                userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
            }

            return int.TryParse(userIdClaim, out int userId) ? userId : (int?)null;
        }
    }
}
