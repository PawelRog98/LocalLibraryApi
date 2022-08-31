using LibraryApi.Models.Email;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit.Text;
using LibraryApi.Services.Interfaces;

namespace LibraryApi.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailConfiguration _emailConfiguration;
        public EmailService(EmailConfiguration emailConfiguration)
        {
            _emailConfiguration = emailConfiguration;
        }
        public async Task SendEmail(CreateEmailDto createEmailDto)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_emailConfiguration.Email));
            email.To.Add(MailboxAddress.Parse(createEmailDto.Destination));
            email.Subject = createEmailDto.Subject;
            email.Body = new TextPart(TextFormat.Html)
            {
                Text = createEmailDto.Text
            };

            using(var smtpClient = new SmtpClient())
            {
                smtpClient.CheckCertificateRevocation = false;
                await smtpClient.ConnectAsync(_emailConfiguration.EmailSmtp, _emailConfiguration.Port, SecureSocketOptions.StartTls);
                await smtpClient.AuthenticateAsync(_emailConfiguration.Email, _emailConfiguration.EmailPassword);
                await smtpClient.SendAsync(email);
                await smtpClient.DisconnectAsync(true);
            }
        }
    }
}
