using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace UsedVehicleParts.DAL.Entities
{
    public sealed class UsedVehiclePartsContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public UsedVehiclePartsContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public UsedVehiclePartsContext(DbContextOptions<UsedVehiclePartsContext> options)
            : base(options)
        {
        }

        public DbSet<Image> Image { get; set; }
        public DbSet<Make> Make { get; set; }
        public new DbSet<Model> Model { get; set; }
        public DbSet<Part> Part { get; set; }
        public DbSet<PartClass> PartClass { get; set; }
        public DbSet<SpecificationValue> SpecificationValue { get; set; }
        public DbSet<Trim> Trim { get; set; }
        public DbSet<UserData> UserData { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_configuration.GetConnectionString("Main"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Image>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ImageUrl)
                    .HasColumnName("ImageURL")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Make>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.YearFounded).HasColumnType("date");
            });

            modelBuilder.Entity<Model>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.MakeId).HasColumnName("MakeID");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ProductionYearFrom).HasColumnType("date");

                entity.Property(e => e.ProductionYearTo).HasColumnType("date");

                entity.HasOne(d => d.Make);
            });

            modelBuilder.Entity<Part>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.BuyerId).HasColumnName("BuyerID");

                entity.Property(e => e.ImageId).HasColumnName("ImageID");

                entity.Property(e => e.Manufacturer)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PartClassId).HasColumnName("PartClassID");

                entity.Property(e => e.PartNumber)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ProductionYearEnd).HasColumnType("date");

                entity.Property(e => e.PriceUnits)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ProductionYearStart).HasColumnType("date");

                entity.Property(e => e.QualityGrade)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SellerId).HasColumnName("SellerID");

                entity.Property(e => e.TrimId).HasColumnName("TrimID");

                entity.HasOne(d => d.Buyer);
                entity.HasOne(d => d.Image);
                entity.HasOne(d => d.PartClass);
                entity.HasOne(d => d.Seller);
                entity.HasOne(d => d.Trim);
            });

            modelBuilder.Entity<PartClass>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<SpecificationValue>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PartId).HasColumnName("PartID");

                entity.Property(e => e.Units)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Value)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Part);
            });

            modelBuilder.Entity<Trim>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ModelId).HasColumnName("ModelID");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ProductionYearFrom).HasColumnType("date");

                entity.Property(e => e.ProductionYearTo).HasColumnType("date");

                entity.HasOne(d => d.Model);
            });

            modelBuilder.Entity<UserData>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ContactPhone)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PasswordHash)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PasswordSalt)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });
        }
    }
}