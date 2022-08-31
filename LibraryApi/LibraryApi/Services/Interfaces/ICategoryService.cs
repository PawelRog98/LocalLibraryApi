using LibraryApi.Models.Category;
using LibraryApi.Pagination;

namespace LibraryApi.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAll(CategoriesParameters categoriesParameters);
        Task CreateCategory(CategoryDto categoryDto);
        Task<CategoryDto> GetCategory(int id);
        Task UpdateCategory(CategoryDto categoryDto);
        Task DeleteCategory(int id);
    }
}
