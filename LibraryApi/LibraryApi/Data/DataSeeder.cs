using LibraryApi.Enities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace LibraryApi.Data
{
    public class DataSeeder
    {
        private readonly ModelBuilder _modelBuilder;
        private readonly IPasswordHasher<User> _passwordHasher;
        public DataSeeder(ModelBuilder modelBuilder, IPasswordHasher<User> passwordHasher)
        {
            _modelBuilder = modelBuilder;
            _passwordHasher = passwordHasher;
        }
        public void Seed()
        {
            _modelBuilder.Entity<Role>().HasData(GetRoles());
            _modelBuilder.Entity<User>().HasData(GetUsers());
            _modelBuilder.Entity<Status>().HasData(GetStatuses());
        }
        private IEnumerable<User> GetUsers()
        {
            var users = new List<User>()
            {
                new User()
                {
                    Id = 1,
                    FirstName = "Admin",
                    LastName = "Main",
                    Email = "admin@gmail.com",
                    PasswordHash = "Haslo1!",
                    RoleId = 1,
                    IsEmailConfirmed = true,
                    IsSuspended = false

                },
                new User()
                {
                    Id = 2,
                    FirstName = "Employee",
                    LastName = "Main",
                    Email = "emp@gmail.com",
                    PasswordHash = "Haslo2!",
                    RoleId = 2,
                    IsEmailConfirmed = true,
                    IsSuspended = false
                },
                new User()
                {
                    Id = 3,
                    FirstName = "User",
                    LastName = "Main",
                    Email = "user@gmail.com",
                    PasswordHash = "Haslo3!",
                    RoleId = 3,
                    IsEmailConfirmed = true,
                    IsSuspended = false
                }
            };
            foreach(var user in users)
            {
                var password = _passwordHasher.HashPassword(user, user.PasswordHash);
                user.PasswordHash = password;
            }
            return users;
        }
        private IEnumerable<Role> GetRoles()
        {
            var roles = new List<Role>()
            {
                new Role()
                {
                    Id = 1,
                    RoleName = "Administrator"
                },
                new Role()
                {
                    Id= 2,
                    RoleName = "Employee"
                },
                new Role()
                {
                    Id=3,
                    RoleName = "User"
                }
            };
            return roles;
        }
        private IEnumerable<Status> GetStatuses()
        {
            var statuses = new List<Status>()
            {
                new Status()
                {
                    Id=1,
                    StatusName="Ordered"
                },
                new Status()
                {
                    Id=2,
                    StatusName="Prepared"
                },
                new Status()
                {
                    Id=3,
                    StatusName="Received"
                }
                ,
                new Status()
                {
                    Id=4,
                    StatusName="Delayed"
                }
            };
            return statuses;
        }
    }
}
