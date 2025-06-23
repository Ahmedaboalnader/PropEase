using RealEstateAPI.DTOs;

namespace RealEstateAPI.Services
{
    public interface IReviewService
    {
        Task<ReviewResponseDTO> CreateReview(int userId, CreateReviewDTO reviewDto);
        Task<IEnumerable<ReviewResponseDTO>> GetReviewsByProperty(int propertyId);
        Task<ReviewResponseDTO?> UpdateReview(int reviewId, int userId, UpdateReviewDTO reviewDto);
        Task<bool> DeleteReview(int reviewId, int userId);
    }
}
