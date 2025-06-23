using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealEstateAPI.DTOs;
using RealEstateAPI.Models;
using RealEstateAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace RealEstateAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]  
    public class AccountController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AccountController(AppDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        private async Task<User> GetCurrentUserAsync()
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return null;
            return await _context.Users.FirstOrDefaultAsync(u => u.Id.ToString() == userId);
        }

        
        [HttpGet]
        public async Task<IActionResult> GetAccountDetails()
        {
            var user = await GetCurrentUserAsync();
            if (user == null) return NotFound(new { message = "User not found." });

            var dto = new AccountDetailsDto
            {
                Name = user.Name,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber
            };

            return Ok(dto);
        }

      
        [HttpPut]
        public async Task<IActionResult> UpdateAccount([FromBody] UpdateAccountDto dto)
        {
            var user = await GetCurrentUserAsync();
            if (user == null) return NotFound(new { message = "User not found." });

          
            if (user.Email != dto.Email)
            {
                var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
                if (existingUser != null && existingUser.Id != user.Id)
                    return BadRequest(new { message = "Email is already taken." });

                user.Email = dto.Email;
                user.IsEmailConfirmed = false;
            }

            user.Name = dto.Name;
            user.PhoneNumber = dto.PhoneNumber;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Account updated successfully." });
        }
        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
           
            if (dto.NewPassword != dto.ConfirmNewPassword)
                return BadRequest(new { message = "New password and confirmation do not match." });

          
            var user = await GetCurrentUserAsync();
            if (user == null)
                return NotFound(new { message = "User not found." });

            
            var isPasswordValid = BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash);
            if (!isPasswordValid)
                return BadRequest(new { message = "Current password is incorrect." });

           
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);

       
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            
            return Ok(new { message = "Password changed successfully." });
        }

    }
}
