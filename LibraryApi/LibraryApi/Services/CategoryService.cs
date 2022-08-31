using AutoMapper;
using LibraryApi.Data;
using LibraryApi.Enities;
using LibraryApi.Models.Category;
using LibraryApi.Pagination;
using LibraryApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace LibraryApi.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly LibraryDbContext _context;
        public readonly IMapper _mapper;
        public CategoryService(LibraryDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<CategoryDto>> GetAll(CategoriesParameters categoriesParameters)
        {
            var categories = _context.Categories.AsQueryable();

            if (!String.IsNullOrEmpty(categoriesParameters.CategoryName))
            {
                categories = categories.Where(s => s.CategoryName.Contains(categoriesParameters.CategoryName));
            }

            HttpContextAccessor httpContextAccessor = new HttpContextAccessor();

            var pagedTransactions = await PagedList<Category>.CreatePagedList(categories.AsNoTracking(), categoriesParameters.PageIndex, categoriesParameters.PageSize);
            var metadata = new
            {
                pagedTransactions.PageIndex,
                pagedTransactions.TotalPages,
                pagedTransactions.HasNext,
                pagedTransactions.HasPrevious
            };

            httpContextAccessor.HttpContext.Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

            var categoriesDto = _mapper.Map<List<CategoryDto>>(categories);
            return categoriesDto;
        }
        public async Task CreateCategory(CategoryDto categoryDto)
        {
            var category = new Category()
            {
                CategoryName = categoryDto.CategoryName
            };
            await _context.AddAsync(category);
            await _context.SaveChangesAsync();
        }
        public async Task<CategoryDto> GetCategory(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(x=>x.Id == id);
            var categoryDto = _mapper.Map<CategoryDto>(category);

            return categoryDto;
        }
        public async Task UpdateCategory(CategoryDto categoryDto)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(x=>x.Id == categoryDto.Id);

            category.CategoryName = categoryDto.CategoryName;
            _context.Update(category);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteCategory(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);

            _context.Remove(category);
            await _context.SaveChangesAsync();
        }
    }
}
