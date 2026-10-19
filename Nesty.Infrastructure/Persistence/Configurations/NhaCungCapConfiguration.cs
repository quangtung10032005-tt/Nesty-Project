using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class NhaCungCapConfiguration
    : IEntityTypeConfiguration<NhaCungCap>
{
    public void Configure(EntityTypeBuilder<NhaCungCap> builder)
    {
        builder.ToTable("NhaCungCap");

        builder.HasKey(x => x.NhaCungCapID);

        builder.Property(x => x.TenNhaCungCap)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.SoDienThoai)
            .HasMaxLength(15);

        builder.Property(x => x.Email)
            .HasMaxLength(100);

        builder.Property(x => x.DiaChi)
            .HasMaxLength(255);

        builder.Property(x => x.TrangThai)
            .IsRequired();
    }
}