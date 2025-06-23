using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using RealEstateAPI.Data;
using RealEstateAPI.DTOs;
using RealEstateAPI.Models;

public class PropertyService : IPropertyService
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _env;

    public PropertyService(AppDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    public async Task<PropertyResponseDTO> CreateProperty(int userId, CreatePropertyDTO dto)
    {
        var property = new Property
        {
            Title = dto.Title,
            Description = dto.Description,
            Price = dto.Price,
            Location = dto.Location,
            Area = dto.Area,
            Rooms = dto.Rooms,
            Bathrooms = dto.Bathrooms,
            ListingType = dto.ListingType,
            UserId = userId,

            // Brokers Info
            Name = dto.Name,
            Address = dto.Address,
            Phone = dto.Phone,

            // Highlights
            PropertyType = dto.PropertyType,
            ViewType = dto.ViewType,
            LocationType = dto.LocationType,
            BuildingYear = dto.BuildingYear,
            Parking = dto.Parking,
            Garden = dto.Garden
        };

        // حفظ الصور
        foreach (var formFile in dto.Images)
        {
            var fileName = $"{Guid.NewGuid()}_{formFile.FileName}";
            var path = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads", fileName);

            Directory.CreateDirectory(Path.GetDirectoryName(path)!);
            using var stream = new FileStream(path, FileMode.Create);
            await formFile.CopyToAsync(stream);

            property.Images.Add(new Image { FileName = fileName });
        }

        _context.Properties.Add(property);
        await _context.SaveChangesAsync();

        return MapToDTO(property);
    }

    public async Task<IEnumerable<PropertyResponseDTO>> GetAllProperties()
    {
        var properties = await _context.Properties.Include(p => p.Images).ToListAsync();
        return properties.Select(MapToDTO);
    }

    public async Task<PropertyResponseDTO?> UpdateProperty(int id, int userId, UpdatePropertyDTO dto)
    {
        var property = await _context.Properties.Include(p => p.Images).FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);
        if (property == null) return null;

        // تحديث الحقول الأساسية
        property.Title = dto.Title ?? property.Title;
        property.Description = dto.Description ?? property.Description;
        property.Price = dto.Price ?? property.Price;
        property.Location = dto.Location ?? property.Location;
        property.Area = dto.Area ?? property.Area;
        property.Rooms = dto.Rooms ?? property.Rooms;
        property.Bathrooms = dto.Bathrooms ?? property.Bathrooms;
        property.ListingType = dto.ListingType;

        // تحديث بيانات الوسيط
        property.Name = dto.Name ?? property.Name;
        property.Address = dto.Address ?? property.Address;
        property.Phone = dto.Phone ?? property.Phone;

        // تحديث Highlights
        property.PropertyType = dto.PropertyType ?? property.PropertyType;
        property.ViewType = dto.ViewType ?? property.ViewType;
        property.LocationType = dto.LocationType ?? property.LocationType;
        property.BuildingYear = dto.BuildingYear ?? property.BuildingYear;
        property.Parking = dto.Parking ?? property.Parking;
        property.Garden = dto.Garden ?? property.Garden;

        // تحديث الصور إن وجدت
        if (dto.Images != null && dto.Images.Count > 0)
        {
            // حذف الصور القديمة
            foreach (var img in property.Images)
            {
                var path = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads", img.FileName);
                if (File.Exists(path)) File.Delete(path);
            }
            _context.Images.RemoveRange(property.Images);
            property.Images.Clear();

            // إضافة الصور الجديدة
            foreach (var formFile in dto.Images)
            {
                var fileName = $"{Guid.NewGuid()}_{formFile.FileName}";
                var path = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads", fileName);

                Directory.CreateDirectory(Path.GetDirectoryName(path)!);
                using var stream = new FileStream(path, FileMode.Create);
                await formFile.CopyToAsync(stream);

                property.Images.Add(new Image { FileName = fileName });
            }
        }

        await _context.SaveChangesAsync();
        return MapToDTO(property);
    }

    public async Task<bool> DeleteProperty(int id, int userId)
    {
        var property = await _context.Properties.Include(p => p.Images).FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);
        if (property == null) return false;

        // حذف الصور من السيرفر
        foreach (var img in property.Images)
        {
            var path = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads", img.FileName);
            if (File.Exists(path)) File.Delete(path);
        }

        _context.Properties.Remove(property);
        await _context.SaveChangesAsync();
        return true;
    }
    public async Task<PropertyResponseDTO?> GetPropertyById(int id)
    {
        var property = await _context.Properties.Include(p => p.Images).FirstOrDefaultAsync(p => p.Id == id);
        if (property == null) return null;

        return MapToDTO(property);
    }
    public async Task<IEnumerable<PropertyResponseDTO>> GetPropertiesByListingType(ListingType listingType)
    {
        var properties = await _context.Properties
            .Where(p => p.ListingType == listingType)
            .Include(p => p.Images)
            .ToListAsync();

        return properties.Select(MapToDTO);
    }

    private PropertyResponseDTO MapToDTO(Property property)
    {
        return new PropertyResponseDTO
        {
            Id = property.Id,
            Title = property.Title,
            Description = property.Description,
            Price = property.Price,
            Location = property.Location,
            Area = property.Area,
            Rooms = property.Rooms,
            Bathrooms = property.Bathrooms,
            ListingType = property.ListingType,
            UserId = property.UserId,

          
            Name = property.Name,
            Address = property.Address,
            Phone = property.Phone,

            
            PropertyType = property.PropertyType,
            ViewType = property.ViewType,
            LocationType = property.LocationType,
            BuildingYear = property.BuildingYear,
            Parking = property.Parking,
            Garden = property.Garden,

            Images = property.Images.Select(i => $"/uploads/{i.FileName}").ToList()
        };
    }
}
