﻿// <auto-generated />
using System;
using LibraryApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LibraryApi.Migrations
{
    [DbContext(typeof(LibraryDbContext))]
    [Migration("20220802105042_newUserProperties")]
    partial class newUserProperties
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("LibraryApi.Enities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            RoleName = "Administrator"
                        },
                        new
                        {
                            Id = 2,
                            RoleName = "Employee"
                        },
                        new
                        {
                            Id = 3,
                            RoleName = "User"
                        });
                });

            modelBuilder.Entity("LibraryApi.Enities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime?>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsEmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("IsSuspended")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "admin@gmail.com",
                            FirstName = "Admin",
                            IsEmailConfirmed = true,
                            IsSuspended = false,
                            LastName = "Main",
                            PasswordHash = "AQAAAAEAACcQAAAAEEAP62m3klbZ4WPX3pEjy0ETiy5D/6NNmmIr0AlfsUctF6BsQ7jbGgsFQfGz24wP2g==",
                            RoleId = 1
                        },
                        new
                        {
                            Id = 2,
                            Email = "emp@gmail.com",
                            FirstName = "Employee",
                            IsEmailConfirmed = true,
                            IsSuspended = false,
                            LastName = "Main",
                            PasswordHash = "AQAAAAEAACcQAAAAEEFR2g6C803unqWF6xkvCt2uiwlZ0/0E3wCRZQCziIvjrL5KvSoMGviIXcTIO6ViLA==",
                            RoleId = 2
                        },
                        new
                        {
                            Id = 3,
                            Email = "user@gmail.com",
                            FirstName = "User",
                            IsEmailConfirmed = true,
                            IsSuspended = false,
                            LastName = "Main",
                            PasswordHash = "AQAAAAEAACcQAAAAEAJqRWtQLpZyPT9FqKwdZ1VtTUfDafLhByXOzfmHhEynAt+hO3yr5LguYbITUgOIbw==",
                            RoleId = 3
                        });
                });

            modelBuilder.Entity("LibraryApi.Enities.User", b =>
                {
                    b.HasOne("LibraryApi.Enities.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });
#pragma warning restore 612, 618
        }
    }
}
