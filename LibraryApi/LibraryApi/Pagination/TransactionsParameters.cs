namespace LibraryApi.Pagination
{
    public class TransactionsParameters : ListParameters
    {
        public string Email { get; set; }
        public int? StatusId { get; set; }
    }
}
