using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace UsedVehicleParts.API.DAL.Entities
{
    public class UsedVehiclePartsContext : DbContext
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

        public UsedVehiclePartsContext()
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
                    .IsRequired()
                    .HasColumnName("ImageURL")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Make>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.YearFounded).HasColumnType("date");
            });

            modelBuilder.Entity<Model>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.MakeId).HasColumnName("MakeID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ProductionYearFrom).HasColumnType("date");

                entity.Property(e => e.ProductionYearTo).HasColumnType("date");

                entity.HasOne(d => d.Make)
                    .WithMany(p => p.Model)
                    .HasForeignKey(d => d.MakeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Model__MakeID__3F466844");
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
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PartClassId).HasColumnName("PartClassID");

                entity.Property(e => e.PartNumber)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PriceUnits)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ProductionYearEnd).HasColumnType("date");

                entity.Property(e => e.ProductionYearStart).HasColumnType("date");

                entity.Property(e => e.SellerId).HasColumnName("SellerID");

                entity.Property(e => e.TrimId).HasColumnName("TrimID");

                entity.HasOne(d => d.Buyer)
                    .WithMany(p => p.PartBuyer)
                    .HasForeignKey(d => d.BuyerId)
                    .HasConstraintName("FK__Part__BuyerID__46E78A0C");

                entity.HasOne(d => d.Image)
                    .WithMany(p => p.Part)
                    .HasForeignKey(d => d.ImageId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Part__ImageID__45F365D3");

                entity.HasOne(d => d.PartClass)
                    .WithMany(p => p.Part)
                    .HasForeignKey(d => d.PartClassId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Part__PartClassI__44FF419A");

                entity.HasOne(d => d.Seller)
                    .WithMany(p => p.PartSeller)
                    .HasForeignKey(d => d.SellerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Part__SellerID__48CFD27E");

                entity.HasOne(d => d.Trim)
                    .WithMany(p => p.Part)
                    .HasForeignKey(d => d.TrimId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Part__TrimID__47DBAE45");
            });

            modelBuilder.Entity<PartClass>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<SpecificationValue>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PartId).HasColumnName("PartID");

                entity.Property(e => e.Units)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Part)
                    .WithMany(p => p.SpecificationValue)
                    .HasForeignKey(d => d.PartId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Specifica__PartI__4BAC3F29");
            });

            modelBuilder.Entity<Trim>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ModelId).HasColumnName("ModelID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ProductionYearFrom).HasColumnType("date");

                entity.Property(e => e.ProductionYearTo).HasColumnType("date");

                entity.HasOne(d => d.Model)
                    .WithMany(p => p.Trim)
                    .HasForeignKey(d => d.ModelId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Trim__ModelID__4222D4EF");
            });

            modelBuilder.Entity<UserData>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ContactPhone)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PasswordSalt)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });
        }
    }
}
