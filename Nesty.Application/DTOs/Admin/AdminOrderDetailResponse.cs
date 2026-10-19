using Nesty.Application.DTOs.DonHang;

namespace Nesty.Application.DTOs.Admin.DonHang;

public class AdminOrderDetailResponse : OrderDetailResponse
{
    // Kế thừa OrderDetailResponse của Day 10 và mở rộng thêm thông tin Khách hàng
    public int? KhachHangID { get; set; }
    public string EmailKhachHang { get; set; } = string.Empty;

    // Giao hàng
    public string? TrangThaiGiaoHang { get; set; }
    public string? DonViVanChuyen { get; set; }
    public string? MaVanDon { get; set; }
}