using Nesty.Domain.Entities;

namespace Nesty.Application.Interfaces.Repositories;

public interface IBienTheRepository
    : IRepository<BienTheSanPham>
{
    Task<List<BienTheSanPham>> GetBySanPhamIdAsync(int sanPhamId);
}