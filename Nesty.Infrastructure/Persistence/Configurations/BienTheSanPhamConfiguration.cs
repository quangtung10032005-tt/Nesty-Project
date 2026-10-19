using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class BienTheSanPhamConfiguration
    : IEntityTypeConfiguration<BienTheSanPham>
{
    public void Configure(
        EntityTypeBuilder<BienTheSanPham> builder)
    {
        builder.ToTable("BienTheSanPham");

        builder.HasKey(x => x.BienTheID);

        builder.Property(x => x.SKU)
            .HasMaxLength(50)
            .IsRequired();

        builder.HasIndex(x => x.SKU)
            .IsUnique();

        builder.Property(x => x.GiaBan)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(x => x.TrangThai)
            .IsRequired();

        // Sản phẩm 1 - N Biến thể
        builder.HasOne(x => x.SanPham)
            .WithMany(x => x.BienTheSanPhams)
            .HasForeignKey(x => x.SanPhamID)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.KichThuoc)
            .WithMany()
            .HasForeignKey(x => x.KichThuocID)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.MauSac)
            .WithMany()
            .HasForeignKey(x => x.MauSacID)
            .OnDelete(DeleteBehavior.Restrict);
    }
}