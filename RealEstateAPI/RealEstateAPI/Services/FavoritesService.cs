using Microsoft.EntityFrameworkCore;
using RealEstateAPI.Data;
using RealEstateAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealEstateAPI.Services
{
    public class FavoritesService : IFavoritesService
    {
        private readonly AppDbContext _context;

        public FavoritesService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> ToggleFavoriteAsync(int userId, int propertyId)
        {
            var favorite = await _context.Favorites
                .FirstOrDefaultAsync(f => f.UserId == userId && f.PropertyId == propertyId);

            if (favorite != null)
            {
                
                _context.Favorites.Remove(favorite);
                await _context.SaveChangesAsync();
                return false; 
            }
            else
            {
                
                var newFavorite = new Favorite
                {
                    UserId = userId,
                    PropertyId = propertyId
                };
                _context.Favorites.Add(newFavorite);
                await _context.SaveChangesAsync();
                return true;
            }
        }

      
        public async Task<List<Property>> GetUserFavoritesAsync(int userId)
        {
            return await _context.Favorites
                .Where(f => f.UserId == userId)
                .Include(f => f.Property)  
                .Select(f => f.Property)  
                .ToListAsync();
        }

        
        public async Task<bool> IsFavoriteAsync(int userId, int propertyId)
        {
            return await _context.Favorites
                .AnyAsync(f => f.UserId == userId && f.PropertyId == propertyId);
        }
    }
}
