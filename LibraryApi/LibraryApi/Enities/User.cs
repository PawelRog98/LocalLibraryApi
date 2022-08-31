using System.ComponentModel.DataAnnotations;

namespace LibraryApi.Enities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public bool IsEmailConfirmed { get; set; }
        public bool IsSuspended { get; set; }
        public int RoleId { get; set; }
        public virtual Role Role { get; set; }
        public string? VerificationToken { get; set; }
        public string? ResetPasswordToken { get; set; }
        public DateTime? ResetPasswordExpirationDate { get; set; }
    }
}
