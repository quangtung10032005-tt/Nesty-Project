using Nesty.Application.DTOs.Admin.KhachHang;

namespace Nesty.Application.Interfaces;

public interface IKhachHangAdminService
{
    Task<List<AdminCustomerListResponse>> GetAllCustomersAsync();
    Task<AdminCustomerDetailResponse?> GetCustomerDetailAsync(int khachHangId);
}