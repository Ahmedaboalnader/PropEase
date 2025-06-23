using RealEstateAPI.DTOs;
using RealEstateAPI.Models;

public interface IPropertyService
{
    Task<PropertyResponseDTO> CreateProperty(int userId, CreatePropertyDTO dto);
    Task<IEnumerable<PropertyResponseDTO>> GetAllProperties();
    Task<PropertyResponseDTO?> UpdateProperty(int id, int userId, UpdatePropertyDTO dto);
    Task<IEnumerable<PropertyResponseDTO>> GetPropertiesByListingType(ListingType listingType);
    Task<PropertyResponseDTO> GetPropertyById(int id);
    Task<bool> DeleteProperty(int id, int userId);

}

