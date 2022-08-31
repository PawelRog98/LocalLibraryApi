namespace LibraryApi.Models.Authorization
{
    public class ResetPasswordDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string ResetPasswordToken { get; set; }
    }
}
