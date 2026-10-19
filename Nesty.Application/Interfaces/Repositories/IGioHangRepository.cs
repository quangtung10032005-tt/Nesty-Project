using Nesty.Domain.Entities;

namespace Nesty.Application.Interfaces.Repositories;

public interface IGioHangRepository
    : IRepository<GioHang>
{
    Task<GioHang?> GetByKhachHangIdAsync(
        int khachHangId);

    Task<GioHang?> GetCartWithItemsAsync(
        int khachHangId);

    Task<ChiTietGioHang?> GetCartItemAsync(
        int chiTietGioHangId,
        int khachHangId);

    Task<ChiTietGioHang?> GetCartItemByVariantAsync(
        int khachHangId,
        int bienTheId);

    Task AddCartItemAsync(ChiTietGioHang item);
    void RemoveCartItem(ChiTietGioHang item);
}