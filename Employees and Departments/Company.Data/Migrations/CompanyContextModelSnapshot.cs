﻿// <auto-generated />
using System;
using Company.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Company.Data.Migrations
{
    [DbContext(typeof(CompanyContext))]
    partial class CompanyContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.12")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Company.Domain.Entity.AppUser", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("UserId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Company.Domain.Entity.AppUserClaim", b =>
                {
                    b.Property<Guid>("ClaimId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<string>("ClaimType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ClaimId");

                    b.ToTable("UserClaim");
                });

            modelBuilder.Entity("Company.Domain.Entity.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("WizardId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WizardId");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("Company.Domain.Entity.Wizard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<Guid>("AppUserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("Wizards");
                });

            modelBuilder.Entity("Company.Domain.Entity.Item", b =>
                {
                    b.HasOne("Company.Domain.Entity.Wizard", null)
                        .WithMany("Items")
                        .HasForeignKey("WizardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Company.Domain.Entity.Wizard", b =>
                {
                    b.HasOne("Company.Domain.Entity.AppUser", null)
                        .WithMany("Wizards")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Company.Domain.Entity.AppUser", b =>
                {
                    b.Navigation("Wizards");
                });

            modelBuilder.Entity("Company.Domain.Entity.Wizard", b =>
                {
                    b.Navigation("Items");
                });
#pragma warning restore 612, 618
        }
    }
}
