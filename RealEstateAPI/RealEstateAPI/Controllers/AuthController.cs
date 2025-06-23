using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RealEstateAPI.Data;
using RealEstateAPI.DTOs;
using RealEstateAPI.Models;
using RealEstateAPI.Services;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RealEstateAPI.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;
        private readonly EmailService _emailService;

        public AuthController(AppDbContext context, IConfiguration config, EmailService emailService)
        {
            _context = context;
            _config = config;
            _emailService = emailService;
        }

        // ------------------- Register -------------------
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (_context.Users.Any(u => u.Email == dto.Email))
                return BadRequest(new { message = "Email already registered." });

            if (_context.Users.Any(u => u.PhoneNumber == dto.PhoneNumber))
                return BadRequest(new { message = "Phone number already registered." });

            var otp = new Random().Next(100000, 999999).ToString();

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                OTP = otp,
                OTPExpiry = DateTime.UtcNow.AddMinutes(5),
                IsEmailConfirmed = false,
                RefreshToken = GenerateRefreshToken(),
                RefreshTokenExpiry = DateTime.UtcNow.AddDays(7)
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            await _emailService.SendEmailAsync(user.Email, "OTP Code", $"<h2>Hello {user.Name}</h2><p>Your OTP: <strong>{otp}</strong><br>Expires in 5 mins.</p>");

            return Ok(new
            {
                message = "Registered successfully. Verify your email.",
                accessToken = GenerateJwtToken(user),
                refreshToken = user.RefreshToken,
                user = new { user.Id, user.Name, user.Email, user.PhoneNumber }
            });
        }

        // ------------------- Verify OTP -------------------
        [HttpPost("verify-otp")]
        public IActionResult VerifyOtp([FromBody] VerifyOtpDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (user == null || user.OTP != dto.OTP || user.OTPExpiry < DateTime.UtcNow)
                return BadRequest(new { message = "Invalid or expired OTP." });

            user.IsEmailConfirmed = true;
            user.OTP = null;
            user.OTPExpiry = null;
            _context.SaveChanges();

            return Ok(new { message = "Email verified successfully." });
        }

        // ------------------- Login by Email -------------------
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized(new { message = "Invalid credentials." });

            if (!user.IsEmailConfirmed)
                return Unauthorized(new { message = "Please verify your email." });

            user.RefreshToken = GenerateRefreshToken();
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            _context.SaveChanges();

            return Ok(new
            {
                accessToken = GenerateJwtToken(user),
                refreshToken = user.RefreshToken,
                user = new { user.Id, user.Name, user.Email, user.PhoneNumber }
            });
        }

        // ------------------- Login by Phone -------------------
        [HttpPost("login-by-phone")]
        public IActionResult LoginByPhone([FromBody] LoginByPhoneDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.PhoneNumber == dto.PhoneNumber);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized(new { message = "Invalid credentials." });

            if (!user.IsEmailConfirmed)
                return Unauthorized(new { message = "Please verify your email." });

            user.RefreshToken = GenerateRefreshToken();
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            _context.SaveChanges();

            return Ok(new
            {
                accessToken = GenerateJwtToken(user),
                refreshToken = user.RefreshToken,
                user = new { user.Id, user.Name, user.Email, user.PhoneNumber }
            });
        }

        // ------------------- Forgot Password (Send OTP) -------------------
        [HttpPost("forgot-password")]
        public async Task<IActionResult> SendResetOtp([FromBody] ForgotPasswordDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (user == null)
                return BadRequest(new { message = "User not found." });

            var otp = new Random().Next(100000, 999999).ToString();
            user.OTP = otp;
            user.OTPExpiry = DateTime.UtcNow.AddMinutes(5);
            _context.SaveChanges();

            await _emailService.SendEmailAsync(user.Email, "Reset Password", $"<h2>Reset OTP</h2><p>Your OTP: <strong>{otp}</strong></p>");

            return Ok(new { message = "OTP sent to your email." });
        }

        // ------------------- Verify Reset OTP -------------------
        [HttpPost("verify-reset-otp")]
        public IActionResult VerifyResetOtp([FromBody] VerifyOtpDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (user == null || user.OTP != dto.OTP || user.OTPExpiry < DateTime.UtcNow)
                return BadRequest(new { message = "Invalid or expired OTP." });

            user.IsResetOtpVerified = true;
            user.OTP = null;
            user.OTPExpiry = null;
            _context.SaveChanges();

            return Ok(new { message = "OTP verified. Proceed to reset password." });
        }

        // ------------------- Reset Password -------------------
        [HttpPost("reset-password")]
        public IActionResult ResetPassword([FromBody] ResetPasswordDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (user == null)
                return BadRequest(new { message = "User not found." });

            if (dto.NewPassword != dto.ConfirmPassword)
                return BadRequest(new { message = "Passwords do not match." });

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            _context.SaveChanges();

            return Ok(new { message = "Password reset successfully." });
        }
        // ------------------- Resend OTP (After Register) -------------------
        [HttpPost("resend-otp-after-register")]
        public async Task<IActionResult> ResendOtpAfterRegister([FromBody] ResendOtpDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (user == null)
                return BadRequest(new { message = "User not found." });

            if (user.IsEmailConfirmed)
                return BadRequest(new { message = "Email already verified." });

            
            if (user.LastOtpSent.HasValue && DateTime.UtcNow < user.LastOtpSent.Value.AddSeconds(30))  
            {
                return BadRequest(new { message = "Please wait before resending OTP." });
            }

            var otp = new Random().Next(100000, 999999).ToString();
            user.OTP = otp;
            user.OTPExpiry = DateTime.UtcNow.AddMinutes(5); 
            user.LastOtpSent = DateTime.UtcNow;  

            await _context.SaveChangesAsync();

            await _emailService.SendEmailAsync(user.Email, "OTP Code", $"<h2>Hello {user.Name}</h2><p>Your OTP: <strong>{otp}</strong><br>Expires in 5 mins.</p>");

            return Ok(new { message = "OTP resent successfully." });
        }



        // ------------------- Resend Reset OTP (Forgot Password) -------------------
        [HttpPost("resend-otp-after-forgot")]
        public async Task<IActionResult> ResendOtpAfterForgot([FromBody] ResendOtpDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (user == null)
                return BadRequest(new { message = "User not found." });

         
            if (user.LastOtpSent.HasValue && DateTime.UtcNow < user.LastOtpSent.Value.AddSeconds(60)) 
            {
                return BadRequest(new { message = "Please wait before resending OTP." });
            }

            var otp = new Random().Next(100000, 999999).ToString();
            user.OTP = otp;
            user.OTPExpiry = DateTime.UtcNow.AddMinutes(5); 
            user.LastOtpSent = DateTime.UtcNow;  

            await _context.SaveChangesAsync();

            await _emailService.SendEmailAsync(user.Email, "Reset Password - OTP", $"<h2>Hello {user.Name}</h2><p>Your OTP: <strong>{otp}</strong><br>Expires in 5 mins.</p>");

            return Ok(new { message = "Reset OTP resent successfully." });
        }

        // ------------------- Helpers -------------------
        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:SecretKey"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
                issuer: _config["JwtSettings:Issuer"],
                audience: _config["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_config["JwtSettings:ExpiryMinutes"])),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            var bytes = new byte[64];
            using var rng = new System.Security.Cryptography.RNGCryptoServiceProvider();
            rng.GetBytes(bytes);
            return Convert.ToBase64String(bytes);
        }
    }
}
