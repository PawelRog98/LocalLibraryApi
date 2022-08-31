namespace LibraryApi.Pagination
{
    public abstract class ListParameters
    {
        public int PageSize { get; set; } = 2;
        public int PageIndex { get; set; } = 1;
    }
}
