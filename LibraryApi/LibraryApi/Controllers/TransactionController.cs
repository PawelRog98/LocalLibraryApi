using Microsoft.AspNetCore.Authorization;
using LibraryApi.Models.Transaction;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LibraryApi.Pagination;
using LibraryApi.Services.Interfaces;

namespace LibraryApi.Controllers
{
    [Route("api/transaction")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }
        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateTransactionDto createTransactionDto)
        {
            await _transactionService.CreateTransaction(createTransactionDto);
            return Ok("Book has been added!");
        }
        [Authorize(Roles = "Administrator,Employee")]
        [HttpGet("getall")]
        public async Task<IActionResult> GetAll([FromQuery] TransactionsParameters transactionsParameters)
        {
            var transactions = await _transactionService.GetAllTransactions(transactionsParameters);
            return Ok(transactions);
        }
        [HttpGet("getmy")]
        public async Task<IActionResult> GetMy([FromQuery] TransactionsParameters transactionsParameters)
        {
            var transactions = await _transactionService.GetUserTransactions(transactionsParameters);
            return Ok(transactions);
        }
        [Authorize(Roles = "Administrator,Employee")]
        [HttpGet("getstatuses")]
        public async Task<IActionResult> GetStatuses()
        {
            var statuses = await _transactionService.GetStatuses();
            return Ok(statuses);
        }
        [Authorize(Roles = "Administrator,Employee")]
        [HttpPut("changestatus")]
        public async Task<IActionResult> ChangeStatus([FromBody] ChangeStatusDto changeStatusDto)
        {
            await _transactionService.ChangeStatus(changeStatusDto);
            return Ok("Status has benn changed!");
        }
    }
}
