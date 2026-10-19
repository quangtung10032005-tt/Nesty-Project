using Nesty.Application.DTOs.Customer;

namespace Nesty.Application.Interfaces;

public interface ICustomerService
{
    Task<CustomerProfileDto?> GetProfileAsync(
        int taiKhoanId);

    Task<CustomerProfileDto?> UpdateProfileAsync(
        int taiKhoanId,
        UpdateProfileRequest request);
}