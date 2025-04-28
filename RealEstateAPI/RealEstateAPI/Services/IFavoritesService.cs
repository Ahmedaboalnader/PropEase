using RealEstateAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RealEstateAPI.Services
{
    public interface IFavoritesService
    {
        Task<bool> ToggleFavoriteAsync(int userId, int propertyId);
        Task<List<Property>> GetUserFavoritesAsync(int userId);
        Task<bool> IsFavoriteAsync(int userId, int propertyId);
    }
}
