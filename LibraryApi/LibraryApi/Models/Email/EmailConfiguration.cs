namespace LibraryApi.Models.Email
{
    public class EmailConfiguration
    {
        public string EmailSmtp { get; set; }
        public string Email { get; set; }
        public string EmailPassword { get; set; }
        public int Port { get; set; }
    }
}
