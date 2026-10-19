using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class CuocHoiThoaiConfiguration
    : IEntityTypeConfiguration<CuocHoiThoai>
{
    public void Configure(
        EntityTypeBuilder<CuocHoiThoai> builder)
    {
        builder.ToTable("CuocHoiThoai");

        builder.HasKey(x => x.CuocHoiThoaiID);

        builder.Property(x => x.TrangThai)
            .HasMaxLength(20);

        builder.HasOne(x => x.KhachHang)
            .WithMany()
            .HasForeignKey(x => x.KhachHangID)
            .OnDelete(DeleteBehavior.Cascade);
    }
}