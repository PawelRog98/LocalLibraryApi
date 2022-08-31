using FluentValidation;
using LibraryApi.Data;
using LibraryApi.Enities;
using LibraryApi.Models.Authorization;

namespace LibraryApi.Models.Validators
{
    public class RegisterDtoValidator :AbstractValidator<RegisterDto>
    {
        public RegisterDtoValidator(LibraryDbContext context)
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();

            RuleFor(x => x.Password).MinimumLength(7);

            RuleFor(x => x.ConfirmPassword).Equal(y => y.Password);

            RuleFor(x => x.Email).Custom((val, dbcontext) =>
            {
                var notUniqueEmail = context.Users.Any(u => u.Email == val);
                if (notUniqueEmail)
                {
                    dbcontext.AddFailure("Email", "The email is in use");
                }
            });
        }
    }
}
