using Nesty.Application.DTOs.BienThe;
namespace Nesty.Application.Interfaces;
public interface IBienTheService
{
    Task<List<BienTheDto>> GetBySanPhamIdAsync(int sanPhamId);
    Task<BienTheDto> CreateAsync(CreateBienTheRequest request);
    Task<BienTheDto?> UpdateAsync(int id, UpdateBienTheRequest request);
    Task<bool> DeleteAsync(int id);
}