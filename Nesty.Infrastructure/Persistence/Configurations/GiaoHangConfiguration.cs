using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class GiaoHangConfiguration
    : IEntityTypeConfiguration<GiaoHang>
{
    public void Configure(EntityTypeBuilder<GiaoHang> builder)
    {
        builder.ToTable("GiaoHang");

        builder.HasKey(x => x.GiaoHangID);

        builder.HasIndex(x => x.DonHangID)
            .IsUnique();

        builder.Property(x => x.DonViVanChuyen)
            .HasMaxLength(100);

        builder.Property(x => x.MaVanDon)
            .HasMaxLength(100);

        builder.Property(x => x.TrangThaiGiaoHang)
            .HasMaxLength(30);

        builder.HasOne(x => x.DonHang)
            .WithOne()
            .HasForeignKey<GiaoHang>(x => x.DonHangID)
            .OnDelete(DeleteBehavior.Cascade);
    }
}