using Nesty.Domain.Entities;

namespace Nesty.Application.Interfaces.Repositories;

public interface IHinhAnhRepository
    : IRepository<HinhAnhSanPham>
{
    Task<List<HinhAnhSanPham>> GetBySanPhamIdAsync(int sanPhamId);
}