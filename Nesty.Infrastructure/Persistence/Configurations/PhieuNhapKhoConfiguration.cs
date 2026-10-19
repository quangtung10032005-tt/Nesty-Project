using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class PhieuNhapKhoConfiguration
    : IEntityTypeConfiguration<PhieuNhapKho>
{
    public void Configure(EntityTypeBuilder<PhieuNhapKho> builder)
    {
        builder.ToTable("PhieuNhapKho");

        builder.HasKey(x => x.PhieuNhapKhoID);

        builder.Property(x => x.MaPhieuNhap)
            .HasMaxLength(30)
            .IsRequired();

        builder.HasIndex(x => x.MaPhieuNhap)
            .IsUnique();

        builder.Property(x => x.TongTien)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.GhiChu)
            .HasMaxLength(500);

        builder.HasOne(x => x.Kho)
            .WithMany()
            .HasForeignKey(x => x.KhoID)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.NhaCungCap)
            .WithMany()
            .HasForeignKey(x => x.NhaCungCapID)
            .OnDelete(DeleteBehavior.Restrict);
    }
}