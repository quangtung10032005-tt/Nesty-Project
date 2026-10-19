namespace Nesty.Application.DTOs.DonHang;

public class OrderHistoryItemResponse
{
    public int DonHangID { get; set; }
    public string MaDonHang { get; set; } = string.Empty;
    public DateTime NgayDat { get; set; }
    public decimal TongTien { get; set; }
    public string TrangThaiDonHang { get; set; } = string.Empty;
}