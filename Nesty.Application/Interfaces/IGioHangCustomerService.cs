using Nesty.Application.DTOs.GioHang;
using static System.Net.Mime.MediaTypeNames;

using Nesty.Application.DTOs.GioHang;

namespace Nesty.Application.Interfaces;

public interface IGioHangCustomerService
{
    Task<GioHangDto> GetCartAsync(
        int khachHangId);

    Task<GioHangDto> AddToCartAsync(
        int khachHangId,
        AddToCartRequest request);

    Task<GioHangDto?> UpdateCartItemAsync(
        int khachHangId,
        int chiTietGioHangId,
        UpdateCartItemRequest request);

    Task<GioHangDto?> RemoveCartItemAsync(
        int khachHangId,
        int chiTietGioHangId);
}