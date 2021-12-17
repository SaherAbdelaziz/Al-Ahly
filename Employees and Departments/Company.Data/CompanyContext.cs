using Company.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Company.Data
{
    public class CompanyContext : DbContext
    {
        public CompanyContext(DbContextOptions<CompanyContext> options)
            : base(options)
        {

        }
        //public DbSet<Employee> Employees { get; set; }
        //public DbSet<Department> Departments { get; set; }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<AppUserClaim> Claims { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Employee>().ToTable("Employees");
            //modelBuilder.Entity<Department>().ToTable("Departments");
            modelBuilder.Entity<AppUser>().Property(x => x.UserId).HasDefaultValueSql("NEWID()");
            modelBuilder.Entity<AppUserClaim>().Property(x => x.ClaimId).HasDefaultValueSql("NEWID()");
        }

    }
}
