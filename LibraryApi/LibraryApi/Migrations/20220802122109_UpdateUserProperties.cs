using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryApi.Migrations
{
    public partial class UpdateUserProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "AQAAAAEAACcQAAAAEK8FKRa2xcsnS9iAjFsyz5yUusae9WWjAqbu9qBnUfS+WZlLO12uHA6s5HJFWT8jyg==");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "AQAAAAEAACcQAAAAEFW3IoA+AfxcbWoh9VVSiuBhXaVrjveiRzX/8YbbApM4VOUZsV00VXCN596nCZvcNQ==");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "PasswordHash",
                value: "AQAAAAEAACcQAAAAEORBRNP6xZ2+GKVMnLegRMgu53+JNfyC3WkwQZuGotqtJkceKA6/m4lDXzlAFV9rcw==");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "AQAAAAEAACcQAAAAEEAP62m3klbZ4WPX3pEjy0ETiy5D/6NNmmIr0AlfsUctF6BsQ7jbGgsFQfGz24wP2g==");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "AQAAAAEAACcQAAAAEEFR2g6C803unqWF6xkvCt2uiwlZ0/0E3wCRZQCziIvjrL5KvSoMGviIXcTIO6ViLA==");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "PasswordHash",
                value: "AQAAAAEAACcQAAAAEAJqRWtQLpZyPT9FqKwdZ1VtTUfDafLhByXOzfmHhEynAt+hO3yr5LguYbITUgOIbw==");
        }
    }
}
