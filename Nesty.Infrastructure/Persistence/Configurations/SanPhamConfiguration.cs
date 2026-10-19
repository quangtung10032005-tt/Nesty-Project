using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class SanPhamConfiguration
    : IEntityTypeConfiguration<SanPham>
{
    public void Configure(EntityTypeBuilder<SanPham> builder)
    {
        builder.ToTable("SanPham");

        builder.HasKey(x => x.SanPhamID);

        builder.Property(x => x.TenSanPham)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.MoTa)
            .HasColumnType("nvarchar(max)");

        builder.Property(x => x.ThuongHieu)
            .HasMaxLength(100);

        builder.Property(x => x.TrangThai)
            .IsRequired();

        builder.Property(x => x.NgayTao)
            .HasDefaultValueSql("GETDATE()");

        builder.HasOne(x => x.DanhMucSanPham)
            .WithMany()
            .HasForeignKey(x => x.DanhMucID)
            .OnDelete(DeleteBehavior.Restrict);
    }
}