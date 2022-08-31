using FluentValidation;
using LibraryApi.Models.Category;

namespace LibraryApi.Models.Validators
{
    public class CategoryDtoValidator : AbstractValidator<CategoryDto>
    {
        public CategoryDtoValidator()
        {
            RuleFor(x => x.CategoryName).NotEmpty();
        }
    }
}
