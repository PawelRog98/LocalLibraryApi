using LibraryApi.Enities;
using AutoMapper;
using LibraryApi.Models.Category;
using LibraryApi.Models.Book;
using LibraryApi.Models.Transaction;
using LibraryApi.Models.Authorization;

namespace LibraryApi
{
    public class LibraryMappingProfile:Profile
    {
        public LibraryMappingProfile()
        {
            CreateMap<User, UserInfoDto>()
                .ForMember(u=>u.Id,
                x=>x.MapFrom(s=>s.Id)
                )
                .ForMember(u => u.Email,
                x => x.MapFrom(s => s.Email)
                )
                .ForMember(u => u.FirstName,
                x => x.MapFrom(s => s.FirstName)
                )
                .ForMember(u => u.LastName,
                x => x.MapFrom(s => s.LastName)
                )
                .ForMember(u => u.RoleId,
                x => x.MapFrom(s => s.RoleId)
                )
                .ForMember(u => u.RoleName,
                x => x.MapFrom(s => s.Role.RoleName)
                );

            CreateMap<Role, RoleDto>()
                .ForMember(r => r.Id,
                x => x.MapFrom(s => s.Id)
                )
                .ForMember(r => r.RoleName,
                x => x.MapFrom(s => s.RoleName)
                );

            CreateMap<Category, CategoryDto>()
                .ForMember(c => c.Id,
                x => x.MapFrom(s => s.Id)
                )
                .ForMember(c => c.CategoryName,
                x => x.MapFrom(s => s.CategoryName)
                );

            CreateMap<Transaction, TransactionInfoDto>()
                .ForMember(t => t.Id,
                x => x.MapFrom(s => s.Id)
                )
                .ForMember(t => t.DateOfBorrow,
                x => x.MapFrom(s => s.DateOfBorrow)
                )
                .ForMember(t => t.DeadLine,
                x => x.MapFrom(s => s.Deadline)
                )
                .ForMember(t=>t.Email,
                x=>x.MapFrom(s=>s.User.Email)
                )
                .ForMember(t => t.UserId,
                x => x.MapFrom(s => s.UserId)
                )
                .ForMember(t=>t.StatusId,
                x=>x.MapFrom(s=>s.StatusId)
                )
                .ForMember(t=>t.StatusName,
                x=>x.MapFrom(s=>s.Status.StatusName)
                )
                .ForMember(t => t.Books,
                x => x.MapFrom(s => s.Books)
                );


            CreateMap<Book, BookInfoDto>()
                .ForMember(b => b.BookName,
                x => x.MapFrom(s => s.BookName)
                )
                .ForMember(b => b.Author,
                x => x.MapFrom(s => s.Author)
                )
                .ForMember(b => b.Image,
                x => x.MapFrom(s => s.Image)
                )
                .ForMember(b => b.PublicationYear,
                x => x.MapFrom(s => s.PublicationYear)
                )
                .ForMember(b => b.ISBN,
                x => x.MapFrom(s => s.ISBN)
                )
                .ForMember(b => b.NumberOfPages,
                x => x.MapFrom(s => s.NumberOfPages)
                )
                .ForMember(b => b.NumberOfCopies,
                x => x.MapFrom(s => s.NumberOfCopies)
                )
                .ForMember(b => b.CategoryId,
                x => x.MapFrom(s => s.CategoryId)
                )
                .ForMember(b => b.CategoryName,
                x => x.MapFrom(s => s.Category.CategoryName)
                );

            CreateMap<Status, StatusDto>()
                .ForMember(s => s.Id,
                x => x.MapFrom(s => s.Id)
                )
                .ForMember(s => s.StatusName,
                x => x.MapFrom(s => s.StatusName)
                );
        }
    }
}
