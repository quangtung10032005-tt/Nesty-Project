using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class KhoConfiguration
    : IEntityTypeConfiguration<Kho>
{
    public void Configure(EntityTypeBuilder<Kho> builder)
    {
        builder.ToTable("Kho");

        builder.HasKey(x => x.KhoID);

        builder.Property(x => x.TenKho)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.DiaChi)
            .HasMaxLength(255);

        builder.Property(x => x.TrangThai)
            .IsRequired();
    }
}