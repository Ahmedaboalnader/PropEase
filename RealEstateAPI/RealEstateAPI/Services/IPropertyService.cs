using RealEstateAPI.DTOs;

public interface IPropertyService
{
    Task<PropertyResponseDTO> CreateProperty(int userId, CreatePropertyDTO propertyDto);
    Task<PropertyResponseDTO?> GetPropertyById(int id);
    Task<IEnumerable<PropertyResponseDTO>> GetAllProperties();
    Task<PropertyResponseDTO?> UpdateProperty(int id, int userId, UpdatePropertyDTO propertyDto);
    Task<bool> DeleteProperty(int id, int userId);
}
