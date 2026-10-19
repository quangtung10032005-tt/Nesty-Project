using Microsoft.EntityFrameworkCore;
using Nesty.Domain.Entities;
using Nesty.Application.Interfaces.Repositories;
using Nesty.Infrastructure.Persistence;

namespace Nesty.Infrastructure.Repositories;

public class GioHangRepository
    : Repository<GioHang>, IGioHangRepository
{
    private readonly ApplicationDbContext _nestyContext;

    public GioHangRepository(
        ApplicationDbContext context)
        : base(context)
    {
        _nestyContext = context;
    }

    public async Task<GioHang?> GetByKhachHangIdAsync(
        int khachHangId)
    {
        return await _nestyContext.GioHangs
            .FirstOrDefaultAsync(
                x => x.KhachHangID == khachHangId);
    }

    public async Task<GioHang?> GetCartWithItemsAsync(int khachHangId)
    {
        // 1. Xóa sạch bộ nhớ đệm (cache) của Entity Framework trong request này
        // Ép EF Core phải truy vấn và map lại toàn bộ dữ liệu mới nhất từ CSDL
        _nestyContext.ChangeTracker.Clear();

        return await _nestyContext.GioHangs
            .Include(x => x.ChiTietGioHangs)
                .ThenInclude(x => x.BienTheSanPham)
                    .ThenInclude(x => x.SanPham)
                        .ThenInclude(x => x.HinhAnhSanPhams) // Bổ sung Include Hình ảnh để lấy được đường dẫn ảnh
            .Include(x => x.ChiTietGioHangs)
                .ThenInclude(x => x.BienTheSanPham)
                    .ThenInclude(x => x.KichThuoc)
            .Include(x => x.ChiTietGioHangs)
                .ThenInclude(x => x.BienTheSanPham)
                    .ThenInclude(x => x.MauSac)
            .FirstOrDefaultAsync(x => x.KhachHangID == khachHangId);
    }





    public async Task<ChiTietGioHang?> GetCartItemAsync(
        int chiTietGioHangId,
        int khachHangId)
    {
        return await _nestyContext.ChiTietGioHangs
            .Include(x => x.GioHang)
            .FirstOrDefaultAsync(x =>
                x.ChiTietGioHangID == chiTietGioHangId &&
                x.GioHang.KhachHangID == khachHangId);
    }

    public async Task<ChiTietGioHang?> GetCartItemByVariantAsync(
        int khachHangId,
        int bienTheId)
    {
        return await _nestyContext.ChiTietGioHangs
            .Include(x => x.GioHang)
            .FirstOrDefaultAsync(x =>
                x.GioHang.KhachHangID == khachHangId &&
                x.BienTheID == bienTheId);
    }

    public async Task AddCartItemAsync(ChiTietGioHang item)
    {
        await _nestyContext.ChiTietGioHangs.AddAsync(item);
    }

    public void RemoveCartItem(ChiTietGioHang item)
    {
        _nestyContext.ChiTietGioHangs.Remove(item);
    }
}