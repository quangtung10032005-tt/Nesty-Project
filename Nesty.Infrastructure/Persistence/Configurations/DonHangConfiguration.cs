using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class DonHangConfiguration
    : IEntityTypeConfiguration<DonHang>
{
    public void Configure(EntityTypeBuilder<DonHang> builder)
    {
        builder.ToTable("DonHang");

        builder.HasKey(x => x.DonHangID);

        builder.Property(x => x.MaDonHang)
            .HasMaxLength(30)
            .IsRequired();

        builder.HasIndex(x => x.MaDonHang)
            .IsUnique();

        builder.Property(x => x.TongTien)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(x => x.TrangThaiDonHang)
            .HasMaxLength(30)
            .IsRequired();

        builder.Property(x => x.GhiChu)
            .HasMaxLength(500);

        builder.Property(x => x.HoTenNguoiNhan)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.SoDienThoaiNhan)
            .HasMaxLength(15)
            .IsRequired();

        builder.Property(x => x.TinhThanhNhan)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.QuanHuyenNhan)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.PhuongXaNhan)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.DiaChiNhan)
            .HasMaxLength(255)
            .IsRequired();

        builder.HasOne(x => x.KhachHang)
            .WithMany()
            .HasForeignKey(x => x.KhachHangID)
            .OnDelete(DeleteBehavior.Restrict);
    }
}