using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class ChiTietPhieuNhapKhoConfiguration
    : IEntityTypeConfiguration<ChiTietPhieuNhapKho>
{
    public void Configure(
        EntityTypeBuilder<ChiTietPhieuNhapKho> builder)
    {
        builder.ToTable("ChiTietPhieuNhapKho");

        builder.HasKey(x => x.ChiTietNhapKhoID);

        builder.Property(x => x.SoLuong)
            .IsRequired();

        builder.Property(x => x.DonGiaNhap)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(x => x.ThanhTien)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.HasOne(x => x.PhieuNhapKho)
            .WithMany()
            .HasForeignKey(x => x.PhieuNhapKhoID)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.BienTheSanPham)
            .WithMany()
            .HasForeignKey(x => x.BienTheID)
            .OnDelete(DeleteBehavior.Restrict);
    }
}