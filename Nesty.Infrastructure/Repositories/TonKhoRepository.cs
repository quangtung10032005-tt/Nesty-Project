using Microsoft.EntityFrameworkCore;
using Nesty.Application.Interfaces.Repositories;
using Nesty.Domain.Entities;

using Nesty.Infrastructure.Persistence;

namespace Nesty.Infrastructure.Repositories;

public class TonKhoRepository
    : Repository<TonKho>, ITonKhoRepository
{
  


    public TonKhoRepository(
       ApplicationDbContext context)
       : base(context)
    {
    }

    public async Task<TonKho?> GetByVariantAsync(
        int bienTheId)
    {
        return await _context.TonKhos
            .FirstOrDefaultAsync(x =>
                x.BienTheID == bienTheId);
    }







    public async Task<TonKho?> GetByKhoAndBienTheAsync(int khoId, int bienTheId)
    {
        return await _context.TonKhos
            .FirstOrDefaultAsync(x => x.KhoID == khoId && x.BienTheID == bienTheId);
    }

    public async Task<List<TonKho>> GetAllTonKhoAsync(int? khoId)
    {
        var query = _context.TonKhos
            .Include(x => x.Kho)
            .Include(x => x.BienTheSanPham)
                .ThenInclude(b => b.SanPham)
            .Include(x => x.BienTheSanPham)
                .ThenInclude(b => b.KichThuoc)
            .Include(x => x.BienTheSanPham)
                .ThenInclude(b => b.MauSac)
            .AsQueryable();

        if (khoId.HasValue)
        {
            query = query.Where(x => x.KhoID == khoId);
        }

        return await query.OrderByDescending(x => x.NgayCapNhat).ToListAsync();
    }














}