using FluentValidation;
using LibraryApi.Data;
using LibraryApi.Models.Authorization;

namespace LibraryApi.Models.Validators
{
    public class EditDtoValidator:AbstractValidator<EditAccountDto>
    {
        public EditDtoValidator(LibraryDbContext context)
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
        }
    }
}
