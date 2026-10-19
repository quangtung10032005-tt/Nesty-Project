using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class ChiTietGioHangConfiguration
    : IEntityTypeConfiguration<ChiTietGioHang>
{
    public void Configure(
        EntityTypeBuilder<ChiTietGioHang> builder)
    {
        builder.ToTable("ChiTietGioHang");

        builder.HasKey(x => x.ChiTietGioHangID);

        builder.Property(x => x.SoLuong)
            .IsRequired();

        // 1. Sửa đoạn này: Khai báo rõ collection ChiTietGioHangs của GioHang
        builder.HasOne(x => x.GioHang)
            .WithMany(x => x.ChiTietGioHangs)
            .HasForeignKey(x => x.GioHangID)
            .OnDelete(DeleteBehavior.Cascade);

        // 2. Sửa đoạn này: Khai báo rõ collection ChiTietGioHangs của BienTheSanPham
        builder.HasOne(x => x.BienTheSanPham)
            .WithMany(x => x.ChiTietGioHangs)
            .HasForeignKey(x => x.BienTheID)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(x => new
        {
            x.GioHangID,
            x.BienTheID
        })
        .IsUnique();
    }
}