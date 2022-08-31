using LibraryApi.Models.Email;

namespace LibraryApi.Services.Interfaces
{
    public interface IEmailService
    {
        Task SendEmail(CreateEmailDto createEmailDto);
    }
}
