using RealEstateAPI.DTOs;

namespace RealEstateAPI.Services
{
    public interface IPropertySearchService
    {
        Task<IEnumerable<PropertyResponseDTO>> SearchProperties(PropertyQueryParameters queryParams);
    }
}
