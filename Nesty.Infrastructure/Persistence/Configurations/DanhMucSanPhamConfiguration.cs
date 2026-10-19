using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class DanhMucSanPhamConfiguration
    : IEntityTypeConfiguration<DanhMucSanPham>
{
    public void Configure(EntityTypeBuilder<DanhMucSanPham> builder)
    {
        builder.ToTable("DanhMucSanPham");

        builder.HasKey(x => x.DanhMucID);

        builder.Property(x => x.TenDanhMuc)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.MoTa)
            .HasMaxLength(500);

        builder.Property(x => x.TrangThai)
            .IsRequired();
    }
}