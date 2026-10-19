using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence.Configurations;

public class TinNhanChatbotConfiguration
    : IEntityTypeConfiguration<TinNhanChatbot>
{
    public void Configure(EntityTypeBuilder<TinNhanChatbot> builder)
    {
        builder.ToTable("TinNhanChatbot");

        builder.HasKey(x => x.TinNhanID);

        builder.Property(x => x.NguoiGui)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(x => x.NoiDung)
            .HasColumnType("nvarchar(max)")
            .IsRequired();

        builder.HasOne(x => x.CuocHoiThoai)
            .WithMany()
            .HasForeignKey(x => x.CuocHoiThoaiID)
            .OnDelete(DeleteBehavior.Cascade);
    }
}