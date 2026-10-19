namespace Nesty.Application.DTOs.DonHang;

public class CheckoutItemDto
{
    public int BienTheID { get; set; }

    public string TenSanPham { get; set; } = string.Empty;

    public string? DuongDanAnh { get; set; }

    public string TenKichThuoc { get; set; } = string.Empty;

    public string TenMau { get; set; } = string.Empty;

    public decimal DonGia { get; set; }

    public int SoLuong { get; set; }

    public decimal ThanhTien { get; set; }
}