using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class KhachHangConfiguration
    : IEntityTypeConfiguration<KhachHang>
{
    public void Configure(EntityTypeBuilder<KhachHang> builder)
    {
        builder.ToTable("KhachHang");

        builder.HasKey(x => x.KhachHangID);

        builder.Property(x => x.HoTen)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.SoDienThoai)
            .HasMaxLength(15);

        builder.Property(x => x.Email)
            .HasMaxLength(100);

        builder.Property(x => x.GioiTinh)
            .HasMaxLength(10);

        builder.HasOne(x => x.TaiKhoan)
            .WithOne()
            .HasForeignKey<KhachHang>(x => x.TaiKhoanID)
            .OnDelete(DeleteBehavior.Cascade);
    }
}