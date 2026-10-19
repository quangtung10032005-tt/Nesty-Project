using Nesty.Application.DTOs.Admin.DonHang;

namespace Nesty.Application.Interfaces;

public interface IDonHangAdminService
{
    Task<List<AdminOrderListResponse>> GetAllOrdersAsync();
    Task<AdminOrderDetailResponse?> GetOrderDetailAsync(int donHangId);
    Task<bool> UpdateOrderStatusAsync(int donHangId, UpdateOrderStatusRequest request);
}