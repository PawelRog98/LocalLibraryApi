using System.ComponentModel.DataAnnotations;

namespace LibraryApi.Models.Authorization
{
    public class RegisterDto
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public bool IsEmailConfirmed { get; set; } = false;
        public bool IsSuspended { get; set; } = false;
        public int RoleId { get; set; } = 3;
        public string VerificationToken { get; set; }
    }
}
