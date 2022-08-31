using LibraryApi.Models.Book;

namespace LibraryApi.Models.Transaction
{
    public class TransactionInfoDto
    {
        public int Id { get; set; }
        public DateTime DateOfBorrow { get; set; }
        public DateTime DeadLine { get; set; }
        public int UserId { get; set; }
        public string Email { get; set; }
        public int StatusId { get; set; }
        public string StatusName { get; set; }
        public ICollection<BookInfoDto> Books { get; set; }
    }
}
