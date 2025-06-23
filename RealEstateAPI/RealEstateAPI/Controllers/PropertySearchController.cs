using Microsoft.AspNetCore.Mvc;
using RealEstateAPI.DTOs;
using RealEstateAPI.Services;

namespace RealEstateAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertySearchController : ControllerBase
    {
        private readonly IPropertySearchService _propertySearchService;

        public PropertySearchController(IPropertySearchService propertySearchService)
        {
            _propertySearchService = propertySearchService;
        }

        
        [HttpGet]
        public async Task<IActionResult> SearchProperties([FromQuery] PropertyQueryParameters queryParams)
        {
            var properties = await _propertySearchService.SearchProperties(queryParams);
            return Ok(properties);
        }
    }
}
