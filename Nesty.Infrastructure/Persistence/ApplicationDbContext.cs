using Microsoft.EntityFrameworkCore;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<TaiKhoan> TaiKhoans => Set<TaiKhoan>();
    public DbSet<KhachHang> KhachHangs => Set<KhachHang>();
    public DbSet<DiaChi> DiaChis => Set<DiaChi>();

    public DbSet<DanhMucSanPham> DanhMucSanPhams => Set<DanhMucSanPham>();
    public DbSet<SanPham> SanPhams => Set<SanPham>();
    public DbSet<HinhAnhSanPham> HinhAnhSanPhams => Set<HinhAnhSanPham>();

    public DbSet<KichThuoc> KichThuocs => Set<KichThuoc>();
    public DbSet<MauSac> MauSacs => Set<MauSac>();
    public DbSet<BienTheSanPham> BienTheSanPhams => Set<BienTheSanPham>();

    public DbSet<GioHang> GioHangs => Set<GioHang>();
    public DbSet<ChiTietGioHang> ChiTietGioHangs => Set<ChiTietGioHang>();

    public DbSet<DonHang> DonHangs => Set<DonHang>();
    public DbSet<ChiTietDonHang> ChiTietDonHangs => Set<ChiTietDonHang>();

    public DbSet<ThanhToan> ThanhToans => Set<ThanhToan>();
    public DbSet<GiaoHang> GiaoHangs => Set<GiaoHang>();

    public DbSet<NhaCungCap> NhaCungCaps => Set<NhaCungCap>();
    public DbSet<Kho> Khos => Set<Kho>();

    public DbSet<PhieuNhapKho> PhieuNhapKhos => Set<PhieuNhapKho>();
    public DbSet<ChiTietPhieuNhapKho> ChiTietPhieuNhapKhos
        => Set<ChiTietPhieuNhapKho>();

    public DbSet<TonKho> TonKhos => Set<TonKho>();
    public DbSet<GiaoDichKho> GiaoDichKhos => Set<GiaoDichKho>();

    public DbSet<FAQ> FAQs => Set<FAQ>();
    public DbSet<CuocHoiThoai> CuocHoiThoais => Set<CuocHoiThoai>();
    public DbSet<TinNhanChatbot> TinNhanChatbots => Set<TinNhanChatbot>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(ApplicationDbContext).Assembly);
    }
}