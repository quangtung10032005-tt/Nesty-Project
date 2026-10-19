using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class TaiKhoanConfiguration : IEntityTypeConfiguration<TaiKhoan>
{
    public void Configure(EntityTypeBuilder<TaiKhoan> builder)
    {
        builder.ToTable("TaiKhoan");

        builder.HasKey(x => x.TaiKhoanID);

        builder.Property(x => x.TaiKhoanID)
            .ValueGeneratedOnAdd();

        builder.Property(x => x.TenDangNhap)
            .HasMaxLength(50)
            .IsRequired();

        builder.HasIndex(x => x.TenDangNhap)
            .IsUnique();

        builder.Property(x => x.MatKhau)
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(x => x.VaiTro)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(x => x.TrangThai)
            .IsRequired();

        builder.Property(x => x.NgayTao)
            .HasDefaultValueSql("GETDATE()");

        builder.Property(x => x.LanDangNhapCuoi)
            .IsRequired(false);
    }
}