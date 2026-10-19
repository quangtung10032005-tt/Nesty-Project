using Nesty.Application.DTOs.HinhAnh;
namespace Nesty.Application.Interfaces;
public interface IHinhAnhService
{
    Task<List<HinhAnhDto>> GetBySanPhamIdAsync(int sanPhamId);
    Task<HinhAnhDto> CreateAsync(CreateHinhAnhRequest request);
    Task<HinhAnhDto?> UpdateAsync(int id, UpdateHinhAnhRequest request);
    Task<bool> DeleteAsync(int id);
}