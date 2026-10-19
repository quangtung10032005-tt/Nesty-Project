using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class MauSacConfiguration
    : IEntityTypeConfiguration<MauSac>
{
    public void Configure(EntityTypeBuilder<MauSac> builder)
    {
        builder.ToTable("MauSac");

        builder.HasKey(x => x.MauSacID);

        builder.Property(x => x.TenMau)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.MaMau)
            .HasMaxLength(20);

        builder.Property(x => x.TrangThai)
            .IsRequired();
    }
}