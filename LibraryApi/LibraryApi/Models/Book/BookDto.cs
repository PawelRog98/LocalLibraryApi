namespace LibraryApi.Models.Book
{
    public class BookDto
    {
        public int Id { get; set; }
        public string BookName { get; set; }
        public string Author { get; set; }
        public IFormFile File { get; set; }
        public int PublicationYear { get; set; }
        public string Publisher { get; set; }
        public string ISBN { get; set; }
        public int NumberOfPages { get; set; }
        public string Description { get; set; }
        public int NumberOfCopies { get; set; }
        public int CategoryId { get; set; }
    }
}
