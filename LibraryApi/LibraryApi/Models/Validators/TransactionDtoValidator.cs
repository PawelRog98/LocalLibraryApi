using FluentValidation;
using LibraryApi.Models.Transaction;

namespace LibraryApi.Models.Validators
{
    public class TransactionDtoValidator : AbstractValidator<CreateTransactionDto>
    {
        public TransactionDtoValidator()
        {
            RuleFor(x => x.ExpireDays).NotEmpty().LessThanOrEqualTo(90).GreaterThanOrEqualTo(10);
        }
    }
}
