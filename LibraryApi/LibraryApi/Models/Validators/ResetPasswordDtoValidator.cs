using FluentValidation;
using LibraryApi.Models.Authorization;

namespace LibraryApi.Models.Validators
{
    public class ResetPasswordDtoValidator : AbstractValidator<ResetPasswordDto>
    {
        public ResetPasswordDtoValidator()
        {
            RuleFor(x => x.Password).MinimumLength(7);

            RuleFor(x => x.ConfirmPassword).Equal(y => y.Password);
        }
    }
}
