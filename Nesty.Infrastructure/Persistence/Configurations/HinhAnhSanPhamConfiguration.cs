//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;
//using Nesty.Domain.Entities;

//namespace Nesty.Infrastructure.Persistence.Configurations;

//public class HinhAnhSanPhamConfiguration
//    : IEntityTypeConfiguration<HinhAnhSanPham>
//{
//    public void Configure(
//        EntityTypeBuilder<HinhAnhSanPham> builder)
//    {
//        builder.ToTable("HinhAnhSanPham");

//        builder.HasKey(x => x.HinhAnhID);

//        builder.Property(x => x.DuongDanAnh)
//            .HasMaxLength(500)
//            .IsRequired();

//        builder.Property(x => x.LaAnhChinh)
//            .IsRequired();

//        builder.HasOne(x => x.SanPham)
//            .WithMany()
//            .HasForeignKey(x => x.SanPhamID)
//            .OnDelete(DeleteBehavior.Cascade);
//    }
//}






using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class HinhAnhSanPhamConfiguration
    : IEntityTypeConfiguration<HinhAnhSanPham>
{
    public void Configure(
        EntityTypeBuilder<HinhAnhSanPham> builder)
    {
        builder.ToTable("HinhAnhSanPham");

        builder.HasKey(x => x.HinhAnhID);

        builder.Property(x => x.DuongDanAnh)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(x => x.LaAnhChinh)
            .IsRequired();

        builder.HasOne(x => x.SanPham)
            .WithMany(x => x.HinhAnhSanPhams)
            .HasForeignKey(x => x.SanPhamID)
            .OnDelete(DeleteBehavior.Cascade);
    }
}