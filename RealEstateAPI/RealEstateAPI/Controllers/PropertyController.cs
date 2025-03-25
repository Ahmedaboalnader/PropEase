using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealEstateAPI.DTOs;
using RealEstateAPI.Services;
using System.Security.Claims;

[Route("api/properties")]
[ApiController]
public class PropertyController : ControllerBase
{
    private readonly IPropertyService _propertyService;

    public PropertyController(IPropertyService propertyService)
    {
        _propertyService = propertyService;
    }

    // ✅ إضافة عقار جديد
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateProperty([FromBody] CreatePropertyDTO propertyDto)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();

        var newProperty = await _propertyService.CreateProperty(userId.Value, propertyDto);
        return CreatedAtAction(nameof(GetAllProperties), newProperty);
    }

    // ✅ جلب جميع العقارات
    [HttpGet]
    public async Task<IActionResult> GetAllProperties()
    {
        var properties = await _propertyService.GetAllProperties();
        return Ok(properties);
    }

    // ✅ تحديث العقار
    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateProperty(int id, [FromBody] UpdatePropertyDTO propertyDto)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();

        var updatedProperty = await _propertyService.UpdateProperty(id, userId.Value, propertyDto);
        if (updatedProperty == null) return NotFound();

        return Ok(updatedProperty);
    }

    // ✅ حذف العقار
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteProperty(int id)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();

        var isDeleted = await _propertyService.DeleteProperty(id, userId.Value);
        if (!isDeleted) return NotFound();

        return NoContent();
    }

    // ✅ استخراج الـ UserId من الـ JWT Token
    private int? GetUserId()
    {
        var userIdClaim = User.FindFirst("UserId")?.Value;

        if (string.IsNullOrEmpty(userIdClaim))
        {
            userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
        }

        return int.TryParse(userIdClaim, out int userId) ? userId : (int?)null;
    }
}
