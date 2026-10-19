namespace Nesty.Application.DTOs.Admin.KhachHang;

public class AdminCustomerListResponse
{
    public int KhachHangID { get; set; }
    public string HoTen { get; set; } = string.Empty;
    public string SoDienThoai { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DateTime? NgayTao { get; set; }
    public int SoLuongDonHang { get; set; }
}