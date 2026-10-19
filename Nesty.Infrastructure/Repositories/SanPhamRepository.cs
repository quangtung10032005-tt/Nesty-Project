using Microsoft.EntityFrameworkCore;
using Nesty.Application.Interfaces.Repositories;
using Nesty.Domain.Entities;

using Nesty.Infrastructure.Persistence;

namespace Nesty.Infrastructure.Repositories;

public class SanPhamRepository
    : Repository<SanPham>,
      ISanPhamRepository
{
    public SanPhamRepository(
        ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<List<SanPham>> SearchAsync(
        string? search)
    {
        var query = _dbSet
            .Include(x => x.DanhMucSanPham)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(x =>
                x.TenSanPham.Contains(search));
        }

        return await query
            .OrderByDescending(x => x.NgayTao)
            .ToListAsync();
    }







    public async Task<List<SanPham>> GetCustomerProductsAsync(
        string? search,
        int? danhMucId,
        decimal? minPrice,
        decimal? maxPrice,
        int? kichThuocId,
        int? mauSacId)
    {
        var query = _dbSet
            .AsNoTracking()
            .Include(x => x.DanhMucSanPham)
            .Include(x => x.BienTheSanPhams)
            .Include(x => x.HinhAnhSanPhams)
            .Where(x => x.TrangThai)
            .AsQueryable();

        // SEARCH
        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(x =>
                x.TenSanPham.Contains(search) ||
                (x.MoTa != null && x.MoTa.Contains(search)));
        }

        // CATEGORY
        if (danhMucId.HasValue)
        {
            query = query.Where(x =>
                x.DanhMucID == danhMucId.Value);
        }

        // PRICE
        if (minPrice.HasValue || maxPrice.HasValue)
        {
            query = query.Where(x =>
                x.BienTheSanPhams.Any(b =>
                    b.TrangThai &&
                    (!minPrice.HasValue ||
                        b.GiaBan >= minPrice.Value) &&
                    (!maxPrice.HasValue ||
                        b.GiaBan <= maxPrice.Value)
                ));
        }

        // SIZE + COLOR
        if (kichThuocId.HasValue || mauSacId.HasValue)
        {
            query = query.Where(x =>
                x.BienTheSanPhams.Any(b =>
                    b.TrangThai &&
                    (!kichThuocId.HasValue ||
                        b.KichThuocID == kichThuocId.Value) &&
                    (!mauSacId.HasValue ||
                        b.MauSacID == mauSacId.Value)
                ));
        }

        return await query
            .OrderByDescending(x => x.NgayTao)
            .ToListAsync();
    }


   

    public async Task<SanPham?> GetCustomerProductDetailAsync(
    int sanPhamId)
    {
        return await _dbSet
            .AsNoTracking()
            .Include(x => x.DanhMucSanPham)
            .Include(x => x.HinhAnhSanPhams)
            .Include(x => x.BienTheSanPhams
                .Where(b => b.TrangThai))
                .ThenInclude(x => x.KichThuoc)
            .Include(x => x.BienTheSanPhams
                .Where(b => b.TrangThai))
                .ThenInclude(x => x.MauSac)
            .Where(x =>
                x.SanPhamID == sanPhamId &&
                x.TrangThai)
            .FirstOrDefaultAsync();
    }


}




