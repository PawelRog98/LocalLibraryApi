namespace LibraryApi.Enities
{
    public class Book
    {
        public Book()
        {
            Transactions = new HashSet<Transaction>();
        }
        public int Id { get; set; }
        public string BookName { get; set; }
        public string Author { get; set; }
        public string Image { get; set; }
        public int PublicationYear { get; set; }
        public string Publisher { get; set; }
        public string ISBN { get; set; }
        public int NumberOfPages { get; set; }
        public string Description { get; set; }
        public int NumberOfCopies { get; set; }
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }

        public  virtual ICollection<Transaction> Transactions { get; set; }
    }
}
