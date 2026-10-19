using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class GioHangConfiguration
    : IEntityTypeConfiguration<GioHang>
{
    public void Configure(EntityTypeBuilder<GioHang> builder)
    {
        builder.ToTable("GioHang");

        builder.HasKey(x => x.GioHangID);

        builder.HasIndex(x => x.KhachHangID)
            .IsUnique();

        builder.Property(x => x.NgayTao)
            .HasDefaultValueSql("GETDATE()");

        builder.HasOne(x => x.KhachHang)
            .WithOne()
            .HasForeignKey<GioHang>(x => x.KhachHangID)
            .OnDelete(DeleteBehavior.Cascade);
    }
}