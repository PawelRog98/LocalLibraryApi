namespace LibraryApi.Pagination
{
    public class BooksParameters : ListParameters
    {
        public string? BookName { get; set; }
        public int? CategoryId { get; set; }
    }
}
