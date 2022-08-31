using LibraryApi.Models.Book;
using LibraryApi.Pagination;
using LibraryApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controllers
{
    [Route("api/book")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;
        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }
        [Authorize(Roles = "Administrator,Employee")]
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromForm] BookDto bookDto)
        {
            await _bookService.CreateBook(bookDto);
            return Ok("Book has been added!");
        }
        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var book = await _bookService.GetBook(id);
            return Ok(book);
        }
        [Authorize(Roles = "Administrator,Employee")]
        [HttpPut("update")]
        public async Task<IActionResult> Update([FromForm] BookDto bookDto)
        {
            await _bookService.EditBook(bookDto);
            return Ok("Book has been updated!");
        }
        [HttpGet("getall")]
        public async Task<IActionResult> GetAll([FromQuery] BooksParameters booksParameters)
        {
            var books = await _bookService.GetAllBooks(booksParameters);
            return Ok(books);
        }
    }
}
