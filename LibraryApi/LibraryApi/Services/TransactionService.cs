using LibraryApi.Models.Book;
using LibraryApi.Models.Transaction;
using LibraryApi.Enities;
using LibraryApi.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using LibraryApi.Exceptions;
using Newtonsoft.Json;
using LibraryApi.Pagination;
using LibraryApi.Services.Interfaces;

namespace LibraryApi.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly LibraryDbContext _context;
        public readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public TransactionService(LibraryDbContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task CreateTransaction(CreateTransactionDto createTransactionDto)
        {
            int userId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

            var transaction = new Transaction();

            transaction.StatusId = 1;
            transaction.DateOfBorrow = DateTime.Now;
            transaction.Deadline = DateTime.Now.AddDays(createTransactionDto.ExpireDays);
            transaction.Books = new List<Book>();
            transaction.UserId=userId;

            foreach (var bookDto in createTransactionDto.BooksToTransaction)
            {
                var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == bookDto.Id);
                if (book.NumberOfCopies == 0)
                {
                    throw new BadRequestException("All copies of this book are currently taken!: "+book.BookName);
                }
                book.NumberOfCopies--;

                _context.Books.Update(book);
                transaction.Books.Add(book);
            }


            await _context.AddAsync(transaction);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<TransactionInfoDto>> GetAllTransactions(TransactionsParameters transactionsParameters)
        {
            var transactions = _context.Transactions.Include(x=>x.Books).Include(y=>y.Status).Include(z=>z.User).AsQueryable();

            if (!String.IsNullOrEmpty(transactionsParameters.Email))
            {
                transactions = transactions.Where(s => s.User.Email.Contains(transactionsParameters.Email));
            }
            if (transactionsParameters.StatusId != null)
            {
                transactions = transactions.Where(s => s.StatusId == transactionsParameters.StatusId);
            }

            HttpContextAccessor httpContextAccessor = new HttpContextAccessor();


            var pagedTransactions = await PagedList<Transaction>.CreatePagedList(transactions.AsNoTracking(), transactionsParameters.PageIndex, transactionsParameters.PageSize);
            var metadata = new
            {
                pagedTransactions.PageIndex,
                pagedTransactions.TotalPages,
                pagedTransactions.HasNext,
                pagedTransactions.HasPrevious
            };


            httpContextAccessor.HttpContext.Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));
            var transactionsDto = _mapper.Map<List<TransactionInfoDto>>(transactions);

            return transactionsDto;
        }
        public async Task<IEnumerable<TransactionInfoDto>> GetUserTransactions(TransactionsParameters transactionsParameters)
        {
            int userId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            var transactions = _context.Transactions.Include(x => x.Books).Include(y => y.Status).Include(z => z.User).Where(z => z.UserId == userId).AsQueryable();
            if (transactionsParameters.StatusId != null)
            {
                transactions = transactions.Where(s => s.StatusId == transactionsParameters.StatusId);
            }

            HttpContextAccessor httpContextAccessor = new HttpContextAccessor();

            var pagedTransactions = await PagedList<Transaction>.CreatePagedList(transactions.AsNoTracking(), transactionsParameters.PageIndex, transactionsParameters.PageSize);
            var metadata = new
            {
                pagedTransactions.PageIndex,
                pagedTransactions.TotalPages,
                pagedTransactions.HasNext,
                pagedTransactions.HasPrevious
            };

            httpContextAccessor.HttpContext.Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));
            var transactionsDto = _mapper.Map<List<TransactionInfoDto>>(transactions);
            return transactionsDto;


        }
        public async Task<IEnumerable<StatusDto>> GetStatuses()
        {
            var statuses = await _context.Statuses.ToListAsync();

            var statusesDto = _mapper.Map<List<StatusDto>>(statuses);
            return statusesDto;
        }
        public async Task ChangeStatus(ChangeStatusDto changeStatusDto)
        {
            var transaction = await _context.Transactions.FirstOrDefaultAsync(x => x.Id == changeStatusDto.Id);

            transaction.StatusId = changeStatusDto.StatusId;
            _context.Update(transaction);
            await _context.SaveChangesAsync();
        }
    }
}
