using Microsoft.EntityFrameworkCore;
using RealEstateAPI.Data;
using RealEstateAPI.DTOs;
using RealEstateAPI.Models;

public class PropertyService : IPropertyService
{
    private readonly AppDbContext _context;

    public PropertyService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PropertyResponseDTO> CreateProperty(int userId, CreatePropertyDTO propertyDto)
    {
        var property = new Property
        {
            Title = propertyDto.Title,
            Description = propertyDto.Description,
            Price = propertyDto.Price,
            Location = propertyDto.Location,
            UserId = userId
        };

        _context.Properties.Add(property);
        await _context.SaveChangesAsync();

        return new PropertyResponseDTO
        {
            Id = property.Id,
            Title = property.Title,
            Description = property.Description,
            Price = property.Price,
            Location = property.Location,
            UserId = property.UserId
        };
    }

    public async Task<PropertyResponseDTO?> GetPropertyById(int id)
    {
        var property = await _context.Properties.FindAsync(id);
        if (property == null) return null;

        return new PropertyResponseDTO
        {
            Id = property.Id,
            Title = property.Title,
            Description = property.Description,
            Price = property.Price,
            Location = property.Location,
            UserId = property.UserId
        };
    }

    public async Task<IEnumerable<PropertyResponseDTO>> GetAllProperties()
    {
        return await _context.Properties
            .Select(property => new PropertyResponseDTO
            {
                Id = property.Id,
                Title = property.Title,
                Description = property.Description,
                Price = property.Price,
                Location = property.Location,
                UserId= property.UserId
            })
            .ToListAsync();
    }

    public async Task<PropertyResponseDTO?> UpdateProperty(int id, int userId, UpdatePropertyDTO propertyDto)
    {
        var property = await _context.Properties.FindAsync(id);
        if (property == null || property.UserId != userId)
            return null;

        if (!string.IsNullOrEmpty(propertyDto.Title)) property.Title = propertyDto.Title;
        if (!string.IsNullOrEmpty(propertyDto.Description)) property.Description = propertyDto.Description;
        if (propertyDto.Price.HasValue) property.Price = propertyDto.Price.Value;
        if (!string.IsNullOrEmpty(propertyDto.Location)) property.Location = propertyDto.Location;

        await _context.SaveChangesAsync();

        return new PropertyResponseDTO
        {
            Id = property.Id,
            Title = property.Title,
            Description = property.Description,
            Price = property.Price,
            Location = property.Location,
            UserId = property.UserId
        };
    }

    public async Task<bool> DeleteProperty(int id, int userId)
    {
        var property = await _context.Properties.FindAsync(id);
        if (property == null || property.UserId != userId)
            return false;

        _context.Properties.Remove(property);
        await _context.SaveChangesAsync();
        return true;
    }
}
