using Nesty.Domain.Entities;

namespace Nesty.Application.Interfaces.Repositories;

public interface ISanPhamRepository
    : IRepository<SanPham>
{
    Task<List<SanPham>> SearchAsync(string? search);





    Task<List<SanPham>> GetCustomerProductsAsync(
       string? search,
       int? danhMucId,
       decimal? minPrice,
       decimal? maxPrice,
       int? kichThuocId,
       int? mauSacId);


    Task<SanPham?> GetCustomerProductDetailAsync(
        int sanPhamId);
}