using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class ChiTietDonHangConfiguration
    : IEntityTypeConfiguration<ChiTietDonHang>
{
    public void Configure(
        EntityTypeBuilder<ChiTietDonHang> builder)
    {
        builder.ToTable("ChiTietDonHang");

        builder.HasKey(x => x.ChiTietDonHangID);

        builder.Property(x => x.TenSanPham)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.KichThuoc)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(x => x.MauSac)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.DonGia)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(x => x.SoLuong)
            .IsRequired();

        builder.Property(x => x.ThanhTien)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.HasOne(x => x.DonHang)
            .WithMany()
            .HasForeignKey(x => x.DonHangID)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.BienTheSanPham)
            .WithMany()
            .HasForeignKey(x => x.BienTheID)
            .OnDelete(DeleteBehavior.Restrict);
    }
}