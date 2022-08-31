using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryApi.Migrations
{
    public partial class CategoryAndBookEntitiesRepairs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdCategory",
                table: "Books");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "AQAAAAEAACcQAAAAEP6joBMIMnZUzkdY1LMXZ6F8RZ0kWnWdqdUHpiOjcNNrUQ4eMo+dI14gLWJXf8ljPw==");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "AQAAAAEAACcQAAAAEAAYR9dj5KafmlWuG19JpNZB/Z5heTO6yijspZUYmMeVVjxjgUZj4yd02ptiR+kT5Q==");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "PasswordHash",
                value: "AQAAAAEAACcQAAAAEGF1WOJT0F8xVpBSp1loMsmpJ7JgS2/NDY+3ueCDugeXNj9rk+tsiDpe5rrMswAeMQ==");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdCategory",
                table: "Books",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "AQAAAAEAACcQAAAAEI4DWQ1SQGitXJ9xgWytfMTmg4GCU+L7lW2rDcBEoyTx4UslZwmEI7l8g5jjytsrfQ==");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PasswordHash",
                value: "AQAAAAEAACcQAAAAEPXl4Uaj+uNUJ1IACBY5Ke5mweEeigdthx++UrNlJohn7YGjoXCyVliBt4/Ag6eGwg==");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "PasswordHash",
                value: "AQAAAAEAACcQAAAAEGoM+uxFBC0zqy7cD331X8qdiwfkS/AB28hXYjgaqpPUjgYbGr8eFmge9lP/R4rA8A==");
        }
    }
}
