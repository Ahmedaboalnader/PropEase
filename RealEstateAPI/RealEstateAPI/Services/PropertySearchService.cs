using Microsoft.EntityFrameworkCore;
using RealEstateAPI.Data;
using RealEstateAPI.DTOs;
using RealEstateAPI.Models;

namespace RealEstateAPI.Services
{
    public class PropertySearchService : IPropertySearchService
    {
        private readonly AppDbContext _context;

        public PropertySearchService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PropertyResponseDTO>> SearchProperties(PropertyQueryParameters queryParams)
        {
            var query = _context.Properties.AsQueryable();

            // تطبيق البحث بالكلمات (يشمل Title, Description, Location)
            if (!string.IsNullOrEmpty(queryParams.SearchTerm))
            {
                query = query.Where(p =>
                    p.Title.Contains(queryParams.SearchTerm) ||
                    p.Description.Contains(queryParams.SearchTerm) ||
                    p.Location.Contains(queryParams.SearchTerm));  // إضافة بحث في اللوكيشن
            }

            // إضافة فلترة حسب السعر
            if (queryParams.MinPrice.HasValue)
                query = query.Where(p => p.Price >= queryParams.MinPrice.Value);

            if (queryParams.MaxPrice.HasValue)
                query = query.Where(p => p.Price <= queryParams.MaxPrice.Value);

            // إضافة فلترة حسب عدد الغرف
            if (queryParams.MinRooms.HasValue)
                query = query.Where(p => p.Rooms >= queryParams.MinRooms.Value);

            // إضافة فلترة حسب عدد الحمام
            if (queryParams.MinBathrooms.HasValue)
                query = query.Where(p => p.Bathrooms >= queryParams.MinBathrooms.Value);

            // إضافة فلترة حسب المساحة
            if (queryParams.MinArea.HasValue)
                query = query.Where(p => p.Area >= queryParams.MinArea.Value);

            var properties = await query
                .Select(property => new PropertyResponseDTO
                {
                    Id = property.Id,
                    Title = property.Title,
                    Description = property.Description,
                    Price = property.Price,
                    Location = property.Location,
                    UserId = property.UserId,
                    Rooms = property.Rooms,
                    Bathrooms = property.Bathrooms,
                    Area = property.Area,
                    Images = property.Images.Select(i => $"/uploads/{i.FileName}").ToList()
                })
                .ToListAsync();

            return properties;
        }
    }
}
