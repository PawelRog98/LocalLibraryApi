using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryApi.Migrations
{
    public partial class newUserProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsEmailConfirmed",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSuspended",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "IsEmailConfirmed", "PasswordHash" },
                values: new object[] { true, "AQAAAAEAACcQAAAAEEAP62m3klbZ4WPX3pEjy0ETiy5D/6NNmmIr0AlfsUctF6BsQ7jbGgsFQfGz24wP2g==" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "IsEmailConfirmed", "PasswordHash" },
                values: new object[] { true, "AQAAAAEAACcQAAAAEEFR2g6C803unqWF6xkvCt2uiwlZ0/0E3wCRZQCziIvjrL5KvSoMGviIXcTIO6ViLA==" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "IsEmailConfirmed", "PasswordHash" },
                values: new object[] { true, "AQAAAAEAACcQAAAAEAJqRWtQLpZyPT9FqKwdZ1VtTUfDafLhByXOzfmHhEynAt+hO3yr5LguYbITUgOIbw==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsEmailConfirmed",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsSuspended",
                table: "Users");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "AQAAAAEAACcQAAAAELVYHcZwsm/niqqzH8NBtLsFq7qrsgIsVMtmNgC90rpiUd8894BMiQ8jC4tJ+h8w/Q==");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "AQAAAAEAACcQAAAAEGpcLz+UzjrD04et2g0pSk8/U1ilUvt6E7u622VJot6qT2d2yly4JdRdnzqi4upXxg==");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "PasswordHash",
                value: "AQAAAAEAACcQAAAAEKDw5qcTda8w3RGDTB1E738+VV5n3CiiTdZiNhvpqcAXaFKZfd3F8CVFl4kNDHYHJA==");
        }
    }
}
