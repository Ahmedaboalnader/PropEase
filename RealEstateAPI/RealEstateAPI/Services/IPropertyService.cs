﻿using RealEstateAPI.DTOs;

public interface IPropertyService
{
    Task<PropertyResponseDTO> CreateProperty(int userId, CreatePropertyDTO dto);
    Task<IEnumerable<PropertyResponseDTO>> GetAllProperties();
    Task<PropertyResponseDTO?> UpdateProperty(int id, int userId, UpdatePropertyDTO dto);
    Task<PropertyResponseDTO> GetPropertyById(int id);
    Task<bool> DeleteProperty(int id, int userId);

}

