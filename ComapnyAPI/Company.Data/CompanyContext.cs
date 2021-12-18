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
        public DbSet<Item> Items { get; set; }
        public DbSet<Wizard> Wizards { get; set; }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<AppUserClaim> Claims { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>().ToTable("Items");
            modelBuilder.Entity<Wizard>().ToTable("Wizards");
            modelBuilder.Entity<AppUser>().Property(x => x.UserId).HasDefaultValueSql("NEWID()");
            modelBuilder.Entity<AppUserClaim>().Property(x => x.ClaimId).HasDefaultValueSql("NEWID()");
        }

    }
}
