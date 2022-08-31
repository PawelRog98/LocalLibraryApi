namespace LibraryApi.Models.Email
{
    public class CreateEmailDto
    {
        public string Destination { get; set; }
        public string Subject { get; set; }
        public string Text { get; set; }
    }
}
