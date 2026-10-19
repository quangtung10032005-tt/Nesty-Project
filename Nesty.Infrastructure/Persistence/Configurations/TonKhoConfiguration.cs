using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class TonKhoConfiguration
    : IEntityTypeConfiguration<TonKho>
{
    public void Configure(EntityTypeBuilder<TonKho> builder)
    {
        builder.ToTable("TonKho");

        builder.HasKey(x => x.TonKhoID);

        builder.Property(x => x.SoLuongTon)
            .IsRequired();

        builder.HasIndex(x => new
        {
            x.KhoID,
            x.BienTheID
        })
        .IsUnique();

        builder.HasOne(x => x.Kho)
            .WithMany()
            .HasForeignKey(x => x.KhoID)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.BienTheSanPham)
            .WithMany()
            .HasForeignKey(x => x.BienTheID)
            .OnDelete(DeleteBehavior.Restrict);
    }
}