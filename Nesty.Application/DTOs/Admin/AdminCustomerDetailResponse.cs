using Nesty.Application.DTOs.Admin.DonHang;

namespace Nesty.Application.DTOs.Admin.KhachHang;

public class AdminCustomerDetailResponse
{
    public int KhachHangID { get; set; }
    public string HoTen { get; set; } = string.Empty;
    public string SoDienThoai { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DateTime? NgaySinh { get; set; }
    public string GioiTinh { get; set; } = string.Empty;
    public DateTime? NgayTao { get; set; }

    public List<AdminOrderListResponse> LichSuDonHang { get; set; } = new();
}