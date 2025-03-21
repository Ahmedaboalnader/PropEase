using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RealEstateAPI.Data;
using RealEstateAPI.DTOs;
using RealEstateAPI.Models;
using RealEstateAPI.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly EmailService _emailService;

    public AuthController(AppDbContext context, IConfiguration configuration, EmailService emailService)
    {
        _context = context;
        _configuration = configuration;
        _emailService = emailService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        if (_context.Users.Any(u => u.Email == registerDto.Email))
            return BadRequest(new { message = "Email is already registered." });

        var otp = new Random().Next(100000, 999999).ToString();

        var user = new User
        {
            Name = registerDto.Name,
            Email = registerDto.Email,
            PhoneNumber = registerDto.PhoneNumber,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
            OTP = otp,
            OTPExpiry = DateTime.UtcNow.AddMinutes(5),
            IsEmailConfirmed = false
        };

        _context.Users.Add(user);
        _context.SaveChanges();

        string emailBody = $"<h2>Welcome {user.Name}!</h2><p>Your OTP code is: <strong>{otp}</strong></p><p>It expires in 5 minutes.</p>";
        await _emailService.SendEmailAsync(user.Email, "Your OTP Code", emailBody);

        return Ok(new { message = "User registered successfully! Please verify your OTP." });
    }

    [HttpPost("verify-otp")]
    public IActionResult VerifyOTP([FromBody] VerifyOtpDto otpDto)
    {
        var user = _context.Users.FirstOrDefault(u => u.Email == otpDto.Email);

        if (user == null)
        {
            Console.WriteLine("User not found.");
            return BadRequest(new { message = "User not found." });
        }

        Console.WriteLine($"Stored OTP: {user.OTP}, Received OTP: {otpDto.OTP}, Expiry: {user.OTPExpiry}");

        if (user.OTP != otpDto.OTP)
            return BadRequest(new { message = "Invalid OTP." });

        if (user.OTPExpiry < DateTime.UtcNow)
            return BadRequest(new { message = "Expired OTP." });

        user.OTP = null;
        user.OTPExpiry = null;
        user.IsEmailConfirmed = true;
        _context.SaveChanges();

        return Ok(new { message = "OTP verified successfully! You can now log in." });
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto loginDto)
    {
        var user = _context.Users.FirstOrDefault(u => u.Email == loginDto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
            return Unauthorized(new { message = "Invalid email or password" });

        if (!user.IsEmailConfirmed)
            return Unauthorized(new { message = "Please verify your email first." });

        var token = GenerateJwtToken(user);

        return Ok(new { token });
    }

    private string GenerateJwtToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["JwtSettings:Issuer"],
            audience: _configuration["JwtSettings:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["JwtSettings:ExpiryMinutes"])),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    [HttpPost("forgot-password")]
    public async Task<IActionResult> SendResetOtp([FromBody] ForgotPasswordDto forgotPasswordDto)
    {
        var user = _context.Users.FirstOrDefault(u => u.Email == forgotPasswordDto.Email);
        if (user == null)
            return BadRequest(new { message = "User not found." });

        var otp = new Random().Next(100000, 999999).ToString();
        user.OTP = otp;
        user.OTPExpiry = DateTime.UtcNow.AddMinutes(5);
        _context.SaveChanges();

        string emailBody = $"<h2>Hello {user.Name},</h2><p>Your password reset OTP is: <strong>{otp}</strong></p><p>It expires in 5 minutes.</p>";
        await _emailService.SendEmailAsync(user.Email, "Reset Your Password", emailBody);

        return Ok(new { message = "OTP sent successfully! Check your email." });
    }
    [HttpPost("reset-password")]
    public IActionResult ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
    {
        var user = _context.Users.FirstOrDefault(u => u.Email == resetPasswordDto.Email);
        if (user == null)
            return BadRequest(new { message = "User not found." });

        if (user.OTP != resetPasswordDto.OTP)
            return BadRequest(new { message = "Invalid OTP." });

        if (user.OTPExpiry < DateTime.UtcNow)
            return BadRequest(new { message = "Expired OTP." });

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(resetPasswordDto.NewPassword);
        user.OTP = null;
        user.OTPExpiry = null;
        _context.SaveChanges();

        return Ok(new { message = "Password reset successfully! You can now log in." });
    }

}
