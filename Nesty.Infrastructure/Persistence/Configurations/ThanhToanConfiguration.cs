using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class ThanhToanConfiguration
    : IEntityTypeConfiguration<ThanhToan>
{
    public void Configure(EntityTypeBuilder<ThanhToan> builder)
    {
        builder.ToTable("ThanhToan");

        builder.HasKey(x => x.ThanhToanID);

        builder.HasIndex(x => x.DonHangID)
            .IsUnique();

        builder.Property(x => x.PhuongThucThanhToan)
            .HasMaxLength(30)
            .IsRequired();

        builder.Property(x => x.SoTien)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(x => x.TrangThaiThanhToan)
            .HasMaxLength(30)
            .IsRequired();

        builder.Property(x => x.MaGiaoDich)
            .HasMaxLength(100);

        builder.HasOne(x => x.DonHang)
            .WithOne()
            .HasForeignKey<ThanhToan>(x => x.DonHangID)
            .OnDelete(DeleteBehavior.Cascade);
    }
}