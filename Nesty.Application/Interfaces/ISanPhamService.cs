using Nesty.Application.DTOs.SanPham;

public interface ISanPhamService
{
    Task<List<SanPhamDto>> GetAllAsync(
        string? search);

    Task<SanPhamDto?> GetByIdAsync(
        int id);

    Task<SanPhamDto> CreateAsync(
        CreateSanPhamRequest request);

    Task<SanPhamDto?> UpdateAsync(
        int id,
        UpdateSanPhamRequest request);

    Task<bool> DeleteAsync(
        int id);
}