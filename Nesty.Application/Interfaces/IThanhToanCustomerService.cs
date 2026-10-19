using Nesty.Application.DTOs.ThanhToan;

namespace Nesty.Application.Interfaces;

public interface IThanhToanCustomerService
{
    Task<object> CreatePaymentAsync(
        int khachHangId,
        int donHangId,
        PaymentRequest request);
}