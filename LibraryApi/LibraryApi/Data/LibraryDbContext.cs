using Microsoft.EntityFrameworkCore;
using LibraryApi.Enities;
using Microsoft.AspNetCore.Identity;

namespace LibraryApi.Data
{
    public class LibraryDbContext:DbContext
    {
        public LibraryDbContext(DbContextOptions options):base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Status> Statuses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            PasswordHasher<User> passwordHasher = new PasswordHasher<User>();
            new DataSeeder(modelBuilder, passwordHasher).Seed();
        }
        
    }
}
