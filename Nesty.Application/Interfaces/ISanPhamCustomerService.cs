using Nesty.Application.DTOs.SanPham;

namespace Nesty.Application.Interfaces;

public interface ISanPhamCustomerService
{
    Task<List<SanPhamCustomerDto>> GetProductsAsync(
        SanPhamFilterRequest request);


    Task<SanPhamDetailDto?> GetProductDetailAsync(
        int sanPhamId);

}