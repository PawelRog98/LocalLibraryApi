using FluentValidation;
using LibraryApi.Models.Book;

namespace LibraryApi.Models.Validators
{
    public class BookDtoValidator:AbstractValidator<BookDto>
    {
        public BookDtoValidator()
        {
            RuleFor(x => x.BookName).NotEmpty();
            RuleFor(x => x.Author).NotEmpty();
            RuleFor(x => x.PublicationYear).NotEmpty();
            RuleFor(x => x.Publisher).NotEmpty();
            RuleFor(x => x.ISBN).NotEmpty();
            RuleFor(x => x.NumberOfPages).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.NumberOfCopies).NotEmpty();
        }
    }
}
