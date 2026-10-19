using Microsoft.EntityFrameworkCore;
using Nesty.Application.Interfaces.Repositories;
using Nesty.Domain.Entities;
using Nesty.Infrastructure.Persistence;

namespace Nesty.Infrastructure.Repositories;

public class BienTheRepository
    : Repository<BienTheSanPham>,
      IBienTheRepository
{
    public BienTheRepository(
        ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<List<BienTheSanPham>> GetBySanPhamIdAsync(
        int sanPhamId)
    {
        return await _dbSet
            .Include(x => x.KichThuoc)
            .Include(x => x.MauSac)
            .Where(x => x.SanPhamID == sanPhamId)
            .ToListAsync();
    }
}