using Microsoft.EntityFrameworkCore;
using RealEstateAPI.Data;
using RealEstateAPI.DTOs;
using RealEstateAPI.Models;

namespace RealEstateAPI.Services
{
    public class ReviewService : IReviewService
    {
        private readonly AppDbContext _context;

        public ReviewService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ReviewResponseDTO> CreateReview(int userId, CreateReviewDTO reviewDto)
        {
            var review = new Review
            {
                Rating = reviewDto.Rating,
                Comment = reviewDto.Comment,
                PropertyId = reviewDto.PropertyId,
                UserId = userId
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return new ReviewResponseDTO
            {
                Id = review.Id,
                Rating = review.Rating,
                Comment = review.Comment,
                PropertyId = review.PropertyId,
                UserId = review.UserId
            };
        }

        public async Task<IEnumerable<ReviewResponseDTO>> GetReviewsByProperty(int propertyId)
        {
            return await _context.Reviews
                .Where(r => r.PropertyId == propertyId)
                .Select(r => new ReviewResponseDTO
                {
                    Id = r.Id,
                    Rating = r.Rating,
                    Comment = r.Comment,
                    PropertyId = r.PropertyId,
                    UserId = r.UserId
                })
                .ToListAsync();
        }

        public async Task<ReviewResponseDTO?> UpdateReview(int reviewId, int userId, UpdateReviewDTO reviewDto)
        {
            var review = await _context.Reviews.FindAsync(reviewId);
            if (review == null || review.UserId != userId)
                return null;

            if (reviewDto.Rating.HasValue) review.Rating = reviewDto.Rating.Value;
            if (!string.IsNullOrEmpty(reviewDto.Comment)) review.Comment = reviewDto.Comment;

            await _context.SaveChangesAsync();

            return new ReviewResponseDTO
            {
                Id = review.Id,
                Rating = review.Rating,
                Comment = review.Comment,
                PropertyId = review.PropertyId,
                UserId = review.UserId
            };
        }

        public async Task<bool> DeleteReview(int reviewId, int userId)
        {
            var review = await _context.Reviews.FindAsync(reviewId);
            if (review == null || review.UserId != userId)
                return false;

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
