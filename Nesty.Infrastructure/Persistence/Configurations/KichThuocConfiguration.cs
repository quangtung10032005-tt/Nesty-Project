using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class KichThuocConfiguration
    : IEntityTypeConfiguration<KichThuoc>
{
    public void Configure(EntityTypeBuilder<KichThuoc> builder)
    {
        builder.ToTable("KichThuoc");

        builder.HasKey(x => x.KichThuocID);

        builder.Property(x => x.TenKichThuoc)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(x => x.TrangThai)
            .IsRequired();

        builder.HasIndex(x => x.TenKichThuoc)
            .IsUnique();
    }
}