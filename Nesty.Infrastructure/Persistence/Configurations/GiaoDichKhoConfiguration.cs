using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class GiaoDichKhoConfiguration
    : IEntityTypeConfiguration<GiaoDichKho>
{
    public void Configure(EntityTypeBuilder<GiaoDichKho> builder)
    {
        builder.ToTable("GiaoDichKho");

        builder.HasKey(x => x.GiaoDichKhoID);

        builder.Property(x => x.LoaiGiaoDich)
            .HasMaxLength(30)
            .IsRequired();

        builder.Property(x => x.SoLuong)
            .IsRequired();

        builder.Property(x => x.LyDo)
            .HasMaxLength(255);

        builder.Property(x => x.GhiChu)
            .HasMaxLength(500);

        builder.HasOne(x => x.TonKho)
            .WithMany()
            .HasForeignKey(x => x.TonKhoID)
            .OnDelete(DeleteBehavior.Cascade);
    }
}