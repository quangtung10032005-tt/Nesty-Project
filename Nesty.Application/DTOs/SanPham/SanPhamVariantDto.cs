namespace Nesty.Application.DTOs.SanPham;

public class SanPhamVariantDto
{
    public int BienTheID { get; set; }

    public int KichThuocID { get; set; }

    public string TenKichThuoc { get; set; }
        = string.Empty;

    public int MauSacID { get; set; }

    public string TenMau { get; set; }
        = string.Empty;

    public string? MaMau { get; set; }

    public string SKU { get; set; }
        = string.Empty;

    public decimal GiaBan { get; set; }
}