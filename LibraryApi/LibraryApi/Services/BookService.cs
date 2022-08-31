using AutoMapper;
using LibraryApi.Data;
using LibraryApi.Helpers;
using LibraryApi.Enities;
using LibraryApi.Models.Book;
using Microsoft.EntityFrameworkCore;
using LibraryApi.Exceptions;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using LibraryApi.Pagination;
using LibraryApi.Helpers.Interfaces;
using LibraryApi.Services.Interfaces;

namespace LibraryApi.Services
{
    public class BookService : IBookService
    {
        private readonly LibraryDbContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHost;
        private readonly IImageSaver _imageSaver;
        public BookService(LibraryDbContext context, IMapper mapper, IWebHostEnvironment webHost, IImageSaver imageSaver)
        {
            _context = context;
            _mapper = mapper;
            _webHost = webHost;
            _imageSaver = imageSaver;
        }
        public async Task CreateBook(BookDto bookDto)
        {
            if (bookDto.File == null)
            {
                throw new BadRequestException("File field is empty!");
            }
            var book = new Book()
            {
                BookName = bookDto.BookName,
                Author = bookDto.Author,
                PublicationYear = bookDto.PublicationYear,
                Publisher = bookDto.Publisher,
                ISBN = bookDto.ISBN,
                NumberOfPages = bookDto.NumberOfPages,
                Description = bookDto.Description,
                NumberOfCopies = bookDto.NumberOfCopies,
                CategoryId = bookDto.CategoryId
            };

            string hostPath = _webHost.ContentRootPath;

            book.Image = await _imageSaver.SaveImage(bookDto.File, "BooksImages", hostPath);

            await _context.AddAsync(book);
            await _context.SaveChangesAsync();

        }
        public async Task<BookInfoDto> GetBook(int id)
        {
            var book = await _context.Books.Include(y=>y.Category).FirstOrDefaultAsync(x => x.Id == id);
            var bookDto = _mapper.Map<BookInfoDto>(book);

            return bookDto;

        }
        public async Task EditBook(BookDto bookDto)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x=>x.Id == bookDto.Id);

            book.BookName = bookDto.BookName;
            book.Author = bookDto.Author;
            book.PublicationYear = bookDto.PublicationYear;
            book.Publisher = bookDto.Publisher;
            book.ISBN = bookDto.ISBN;
            book.NumberOfPages = bookDto.NumberOfPages;
            book.Description = bookDto.Description;
            book.NumberOfCopies = bookDto.NumberOfCopies;
            book.CategoryId = bookDto.CategoryId;


            if (bookDto.File != null)
            {
                string hostPath = _webHost.ContentRootPath;
                File.Delete(book.Image);

                book.Image = await _imageSaver.SaveImage(bookDto.File, "BooksImages", hostPath);
            }

            _context.Update(book);
            await _context.SaveChangesAsync();
        }
        public async Task<List<BookInfoDto>> GetAllBooks(BooksParameters booksParameters)
        {
            var books = _context.Books;
            HttpContextAccessor httpContextAccessor = new HttpContextAccessor();
            var querableBooks = books.AsQueryable().OrderBy(o=>o.BookName);


            if (!String.IsNullOrEmpty(booksParameters.BookName))
            {
                querableBooks = querableBooks.Where(s => s.BookName.Contains(booksParameters.BookName))
                    .OrderBy(o => o.BookName);
            }
            if (booksParameters.CategoryId!=null)
            {
                querableBooks = querableBooks.Where(s => s.CategoryId==booksParameters.CategoryId)
                    .OrderBy(o => o.BookName);
            }
            var pagedBooks = await PagedList<Book>.CreatePagedList(querableBooks.AsNoTracking(), booksParameters.PageIndex, booksParameters.PageSize);

            var metadata = new
            {
                pagedBooks.PageIndex,
                pagedBooks.TotalPages,
                pagedBooks.HasNext,
                pagedBooks.HasPrevious
            };  
            httpContextAccessor.HttpContext.Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

            var booksDto = _mapper.Map<List<BookInfoDto>>(pagedBooks);
            return booksDto;
        }

    }
}
