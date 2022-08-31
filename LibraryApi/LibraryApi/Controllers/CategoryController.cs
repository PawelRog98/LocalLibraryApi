using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LibraryApi.Models.Category;
using Microsoft.AspNetCore.Authorization;
using LibraryApi.Pagination;
using LibraryApi.Services.Interfaces;

namespace LibraryApi.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpGet("getall")]
        public async Task<IActionResult> GatAll([FromQuery] CategoriesParameters categoriesParameters)
        {
            var allCategories = await _categoryService.GetAll(categoriesParameters);
            return Ok(allCategories);
        }
        [Authorize(Roles = "Administrator,Employee")]
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CategoryDto categoryDto)
        {
            await _categoryService.CreateCategory(categoryDto);
            return Ok("Category has been added");
        }
        [Authorize(Roles = "Administrator,Employee")]
        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            var category = await _categoryService.GetCategory(id);
            return Ok(category);
        }
        [Authorize(Roles = "Administrator,Employee")]
        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] CategoryDto categoryDto)
        {
            await _categoryService.UpdateCategory(categoryDto);
            return Ok();
        }
        [Authorize(Roles = "Administrator,Employee")]
        [HttpDelete("remove/{id}")]
        public async Task<IActionResult> Remove([FromRoute] int id)
        {
            await _categoryService.DeleteCategory(id);
            return Ok();
        }
    }
}
