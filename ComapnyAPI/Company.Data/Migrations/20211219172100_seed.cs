using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace Company.Data.Migrations
{
    public partial class seed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                $" insert into [User] ([UserName], [Password]) values ( 'Admin', 'Admin')");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
