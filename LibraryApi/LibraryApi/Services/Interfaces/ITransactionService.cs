using LibraryApi.Models.Transaction;
using LibraryApi.Pagination;

namespace LibraryApi.Services.Interfaces
{
    public interface ITransactionService
    {
        Task CreateTransaction(CreateTransactionDto createTransactionDto);
        Task<IEnumerable<TransactionInfoDto>> GetAllTransactions(TransactionsParameters transactionsParameters);
        Task<IEnumerable<TransactionInfoDto>> GetUserTransactions(TransactionsParameters transactionsParameters);
        Task<IEnumerable<StatusDto>> GetStatuses();
        Task ChangeStatus(ChangeStatusDto changeStatusDto);
    }
}
