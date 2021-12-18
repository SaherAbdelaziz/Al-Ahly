using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Company.Data.Migrations
{
    public partial class linkUserWithwizard : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AppUserId",
                table: "Wizards",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Wizards_AppUserId",
                table: "Wizards",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Wizards_User_AppUserId",
                table: "Wizards",
                column: "AppUserId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Wizards_User_AppUserId",
                table: "Wizards");

            migrationBuilder.DropIndex(
                name: "IX_Wizards_AppUserId",
                table: "Wizards");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Wizards");
        }
    }
}
