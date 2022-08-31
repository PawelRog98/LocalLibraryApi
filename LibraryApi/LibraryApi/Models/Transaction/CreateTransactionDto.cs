using LibraryApi.Models.Book;

namespace LibraryApi.Models.Transaction
{
    public class CreateTransactionDto
    {
        public ICollection<BookInfoDto> BooksToTransaction { get; set; }
        public int ExpireDays { get; set; }
        
    }
}
