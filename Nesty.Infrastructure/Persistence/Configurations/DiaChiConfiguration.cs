using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class DiaChiConfiguration
    : IEntityTypeConfiguration<DiaChi>
{
    public void Configure(EntityTypeBuilder<DiaChi> builder)
    {
        builder.ToTable("DiaChi");

        builder.HasKey(x => x.DiaChiID);

        builder.Property(x => x.HoTenNguoiNhan)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.SoDienThoai)
            .HasMaxLength(15)
            .IsRequired();

        builder.Property(x => x.TinhThanh)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.QuanHuyen)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.PhuongXa)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.DiaChiChiTiet)
            .HasMaxLength(255)
            .IsRequired();

        builder.HasOne(x => x.KhachHang)
            .WithMany()
            .HasForeignKey(x => x.KhachHangID)
            .OnDelete(DeleteBehavior.Cascade);
    }
}