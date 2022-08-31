using Microsoft.EntityFrameworkCore;
using LibraryApi.Data;
using LibraryApi.Services;
using Microsoft.AspNetCore.Identity;
using LibraryApi.Enities;
using FluentValidation;
using LibraryApi.Models.Validators;
using FluentValidation.AspNetCore;
using LibraryApi;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using LibraryApi.Middlewares;
using AutoMapper;
using LibraryApi.Models.Category;
using LibraryApi.Models.Book;
using Microsoft.Extensions.FileProviders;
using LibraryApi.Models.Email;
using LibraryApi.Helpers.Interfaces;
using LibraryApi.Helpers;
using LibraryApi.Services.Interfaces;
using LibraryApi.Models.Authorization;

var builder = WebApplication.CreateBuilder(args);

var LibrarySpecificOrigins = "_librarySpecificOrigins";

// Add services to the container.
var JwtAuth = new JwtAuthSettings();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: LibrarySpecificOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:3000").WithExposedHeaders("X-Pagination").AllowAnyMethod().AllowAnyHeader();
    });
});

builder.Configuration.GetSection("JWTAuth").Bind(JwtAuth);

builder.Services.AddSingleton(JwtAuth);
builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = "Bearer";
    option.DefaultScheme = "Bearer";
    option.DefaultChallengeScheme = "Bearer";
}).AddJwtBearer(conf =>
{
    conf.RequireHttpsMetadata = false;
    conf.SaveToken = true;
    conf.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = JwtAuth.JwtIssuer,
        ValidAudience = JwtAuth.JwtIssuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtAuth.JwtKey)),
    };
});

var connectionString = builder.Configuration.GetConnectionString("LibraryDatabase");
builder.Services.AddDbContext<LibraryDbContext>(options =>
    options.UseSqlServer(connectionString));

var emailConfiguration = builder.Configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>();
builder.Services.AddSingleton(emailConfiguration);

builder.Services.AddControllers(
    options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes=true).AddFluentValidation();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<IEmailService, EmailService>();

builder.Services.AddScoped<IImageResizer, ImageResizer>();
builder.Services.AddScoped<IImageSaver, ImageSaver>();

builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<IValidator<RegisterDto>, RegisterDtoValidator>();
builder.Services.AddScoped<IValidator<EditAccountDto>, EditDtoValidator>();
builder.Services.AddScoped<IValidator<CategoryDto>, CategoryDtoValidator>();
builder.Services.AddScoped<IValidator<BookDto>, BookDtoValidator>();
builder.Services.AddScoped<RequestExceptionMiddleware>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(LibrarySpecificOrigins);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "Resources")),
    RequestPath = "/Resources"
});

app.UseAuthentication();
app.UseMiddleware<RequestExceptionMiddleware>();
app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
