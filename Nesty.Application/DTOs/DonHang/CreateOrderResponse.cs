namespace Nesty.Application.DTOs.DonHang;

public class CreateOrderResponse
{
    public int DonHangID { get; set; }

    public string MaDonHang { get; set; } = string.Empty;

    public decimal TongTien { get; set; }

    public string TrangThaiDonHang { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;
}