using Microsoft.EntityFrameworkCore;
using Nesty.Application.Interfaces.Repositories;
using Nesty.Domain.Entities;

using Nesty.Infrastructure.Persistence;

namespace Nesty.Infrastructure.Repositories;

public class KhachHangRepository
    : Repository<KhachHang>,
      IKhachHangRepository
{
    public KhachHangRepository(
        ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<KhachHang?> GetByTaiKhoanIdAsync(
        int taiKhoanId)
    {
        return await _dbSet
            .FirstOrDefaultAsync(
                x => x.TaiKhoanID == taiKhoanId);
    }
    // day 10

    public async Task<List<KhachHang>> GetAllCustomersAsync()
    {
        return await _context.KhachHangs
            .Include(x => x.DonHangs)
            .OrderByDescending(x => x.NgayTao)
            .ToListAsync();
    }

    public async Task<KhachHang?> GetCustomerWithOrdersAsync(int khachHangId)
    {
        return await _context.KhachHangs
            .Include(x => x.DonHangs)
            .FirstOrDefaultAsync(x => x.KhachHangID == khachHangId);
    }
}