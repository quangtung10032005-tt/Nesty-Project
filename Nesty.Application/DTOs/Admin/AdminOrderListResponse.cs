namespace Nesty.Application.DTOs.Admin.DonHang;

public class AdminOrderListResponse
{
    public int DonHangID { get; set; }
    public string MaDonHang { get; set; } = string.Empty;
    public DateTime NgayDat { get; set; }
    public string HoTenNguoiNhan { get; set; } = string.Empty;
    public decimal TongTien { get; set; }
    public string TrangThaiDonHang { get; set; } = string.Empty;
}