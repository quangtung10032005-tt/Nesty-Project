using Microsoft.EntityFrameworkCore;
using Nesty.Application.Interfaces.Repositories;
using Nesty.Domain.Entities;

using Nesty.Infrastructure.Persistence;

namespace Nesty.Infrastructure.Repositories;

public class HinhAnhRepository
    : Repository<HinhAnhSanPham>,
      IHinhAnhRepository
{
    public HinhAnhRepository(
        ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<List<HinhAnhSanPham>> GetBySanPhamIdAsync(
        int sanPhamId)
    {
        return await _dbSet
            .Where(x => x.SanPhamID == sanPhamId)
            .ToListAsync();
    }
}