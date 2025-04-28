using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace RealEstateAPI.Services
{
    public class EmailService : IEmailService

    {
        private readonly SmtpClient _smtpClient;
        private readonly string _fromEmail;

        public EmailService(IConfiguration configuration)
        {
            _fromEmail = configuration["EmailSettings:Username"] ?? throw new ArgumentNullException("Email is missing.");
            _smtpClient = new SmtpClient(configuration["EmailSettings:SmtpServer"])
            {
                Port = int.Parse(configuration["EmailSettings:SmtpPort"] ?? "587"),
                Credentials = new NetworkCredential(_fromEmail, configuration["EmailSettings:Password"]),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network
            };
        }

        public async Task<bool> SendEmailAsync(string toEmail, string subject, string body)
        {
            try
            {
                using (var mail = new MailMessage())
                {
                    mail.From = new MailAddress(_fromEmail, "RealEstate Support");
                    mail.To.Add(toEmail);
                    mail.Subject = subject;
                    mail.IsBodyHtml = true;
                    mail.Priority = MailPriority.High;
                    mail.ReplyToList.Add(new MailAddress("medosharf605@gmail.com"));


                    AlternateView plainTextView = AlternateView.CreateAlternateViewFromString("Your OTP Code", null, "text/plain");
                    AlternateView htmlView = AlternateView.CreateAlternateViewFromString(body, null, "text/html");
                    mail.AlternateViews.Add(plainTextView);
                    mail.AlternateViews.Add(htmlView);


                    mail.Headers.Add("X-Priority", "1");
                    mail.Headers.Add("X-MSMail-Priority", "High");

                    await _smtpClient.SendMailAsync(mail);
                }
                return true;
            }
            catch (SmtpException smtpEx)
            {
                Console.WriteLine($"❌ SMTP Error: {smtpEx.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ General Email Error: {ex.Message}");
            }
            return false;
        }
    }
}