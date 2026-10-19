using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class FAQConfiguration
    : IEntityTypeConfiguration<FAQ>
{
    public void Configure(EntityTypeBuilder<FAQ> builder)
    {
        builder.ToTable("FAQ");

        builder.HasKey(x => x.FAQID);

        builder.Property(x => x.CauHoi)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(x => x.CauTraLoi)
            .HasColumnType("nvarchar(max)")
            .IsRequired();

        builder.Property(x => x.TrangThai)
            .IsRequired();

        builder.Property(x => x.NgayTao)
            .HasDefaultValueSql("GETDATE()");
    }
}