using LibraryApi.Models.Book;
using LibraryApi.Pagination;

namespace LibraryApi.Services.Interfaces
{
    public interface IBookService
    {
        Task CreateBook(BookDto bookDto);
        Task<BookInfoDto> GetBook(int id);
        Task EditBook(BookDto bookDto);
        Task<List<BookInfoDto>> GetAllBooks(BooksParameters booksParameters);
    }
}
