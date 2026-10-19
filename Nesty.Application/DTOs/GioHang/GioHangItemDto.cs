namespace Nesty.Application.DTOs.GioHang;

public class GioHangItemDto
{
    public int ChiTietGioHangID { get; set; }

    public int BienTheID { get; set; }

    public int SanPhamID { get; set; }

    public string TenSanPham { get; set; } = string.Empty;

    public string? DuongDanAnh { get; set; }

    public string TenKichThuoc { get; set; } = string.Empty;

    public string TenMau { get; set; } = string.Empty;

    public string? MaMau { get; set; }

    public string SKU { get; set; } = string.Empty;

    public decimal DonGia { get; set; }

    public int SoLuong { get; set; }

    public decimal ThanhTien { get; set; }
}