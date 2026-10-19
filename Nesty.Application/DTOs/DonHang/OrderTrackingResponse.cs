namespace Nesty.Application.DTOs.DonHang;

public class OrderTrackingResponse
{
    public int DonHangID { get; set; }
    public string MaDonHang { get; set; } = string.Empty;
    public DateTime NgayDat { get; set; }
    public decimal TongTien { get; set; }
    public string TrangThaiDonHang { get; set; } = string.Empty;

    public string? TrangThaiGiaoHang { get; set; }
    public string? DonViVanChuyen { get; set; }
    public string? MaVanDon { get; set; }
    public DateTime? NgayGiao { get; set; }
    public DateTime? NgayDuKien { get; set; }
    public DateTime? NgayNhan { get; set; }
}