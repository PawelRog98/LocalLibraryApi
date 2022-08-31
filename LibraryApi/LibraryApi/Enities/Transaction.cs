namespace LibraryApi.Enities
{
    public class Transaction
    {
        public int Id { get; set; }
        public DateTime DateOfBorrow { get; set; }
        public DateTime Deadline { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public int StatusId { get; set; }
        public virtual Status Status { get; set; }
        public virtual ICollection<Book> Books { get; set; }
    }
}
