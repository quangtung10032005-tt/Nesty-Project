using Nesty.Application.DTOs.DonHang;

namespace Nesty.Application.Interfaces;

public interface IDonHangCustomerService
{

    Task<CheckoutDto> GetCheckoutAsync(int khachHangId);

    Task<CreateOrderResponse> CreateOrderAsync(
        int khachHangId,
        CreateOrderRequest request);



    Task<OrderTrackingResponse?> GetTrackingAsync(
        int khachHangId,
        string maDonHang);

    Task<List<OrderHistoryItemResponse>> GetHistoryAsync(
        int khachHangId);

    Task<OrderDetailResponse?> GetDetailAsync(
        int khachHangId,
        int donHangId);
}