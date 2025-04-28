using Microsoft.AspNetCore.Mvc;
using RealEstateAPI.Data;
using RealEstateAPI.Dtos;
using RealEstateAPI.Models;
using RealEstateAPI.Services;

namespace RealEstateAPI.Controllers
{
    [ApiController]
    [Route("api/contact")]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;

       
        private const string ProjectEmail = "Propeas2@gmail.com";
        private const string ProjectPhone = "01228852654";

        public ContactController(AppDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] ContactUsDto dto)
        {
            var message = new ContactMessage
            {
                Name = dto.Name,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                Subject = dto.Subject,
                Message = dto.Message
            };

            await _context.ContactMessages.AddAsync(message);
            await _context.SaveChangesAsync();

            var emailContent = $@"
                <h3>New Contact Us Message</h3>
                <p><strong>Name:</strong> {dto.Name}</p>
                <p><strong>Email:</strong> {dto.Email}</p>
                <p><strong>Phone:</strong> {dto.PhoneNumber}</p>
                <p><strong>Subject:</strong> {dto.Subject}</p>
                <p><strong>Message:</strong> {dto.Message}</p>";

            await _emailService.SendEmailAsync(ProjectEmail, "New Contact Us Message", emailContent);

            return Ok(new { message = "Message sent successfully." });
        }

        [HttpGet("info")]
        public IActionResult GetContactInfo()
        {
            return Ok(new
            {
                email = ProjectEmail,
                phone = ProjectPhone
            });
        }
    }
}
