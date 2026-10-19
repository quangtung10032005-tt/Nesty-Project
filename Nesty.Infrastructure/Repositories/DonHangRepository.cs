using Microsoft.EntityFrameworkCore;
using Nesty.Application.Interfaces.Repositories;
using Nesty.Domain.Entities;
using Nesty.Infrastructure.Persistence; // Namespace đang dùng ApplicationDbContext của bạn

namespace Nesty.Infrastructure.Repositories;

public class DonHangRepository : Repository<DonHang>, IDonHangRepository
{
    public DonHangRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task AddOrderDetailAsync(ChiTietDonHang chiTiet)
    {
        // Gọi _context (kế thừa từ Repository) và dùng Set<> để trỏ tới bảng ChiTietDonHang
        await _context.Set<ChiTietDonHang>().AddAsync(chiTiet);
    }

    // Viết bên dưới hàm AddOrderDetailAsync
    public async Task<DonHang?> GetDonHangByIdAsync(int donHangId)
    {
        // Dùng FirstOrDefaultAsync sẽ chính xác 100% so với GetByIdAsync mặc định
        return await _context.Set<DonHang>().FirstOrDefaultAsync(x => x.DonHangID == donHangId);
    }

    public async Task<DonHang?> GetByMaDonHangAsync(
       string maDonHang,
       int khachHangId)
    {
        return await _context.DonHangs
            .Include(x => x.GiaoHang)
            .FirstOrDefaultAsync(x =>
                x.MaDonHang == maDonHang &&
                x.KhachHangID == khachHangId);
    }

    public async Task<List<DonHang>> GetHistoryAsync(
        int khachHangId)
    {
        return await _context.DonHangs
            .Where(x => x.KhachHangID == khachHangId)
            .OrderByDescending(x => x.NgayDat)
            .ToListAsync();
    }

    public async Task<DonHang?> GetDetailAsync(
        int donHangId,
        int khachHangId)
    {
        return await _context.DonHangs
            .Include(x => x.ChiTietDonHangs)
            .Include(x => x.GiaoHang)
            .Include(x => x.ThanhToan)
            .FirstOrDefaultAsync(x =>
                x.DonHangID == donHangId &&
                x.KhachHangID == khachHangId);
    }




    // day 10

    // ... code Day 10
    public async Task<List<DonHang>> GetAllForAdminAsync()
    {
        return await _context.DonHangs
            .OrderByDescending(x => x.NgayDat)
            .ToListAsync();
    }

    public async Task<DonHang?> GetDetailForAdminAsync(int donHangId)
    {
        return await _context.DonHangs
            .Include(x => x.ChiTietDonHangs)
            .Include(x => x.GiaoHang)
            .Include(x => x.KhachHang) // Join KhachHang để lấy Email
            .FirstOrDefaultAsync(x => x.DonHangID == donHangId);
    }





}