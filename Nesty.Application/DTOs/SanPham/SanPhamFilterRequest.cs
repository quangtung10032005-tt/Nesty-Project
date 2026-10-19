namespace Nesty.Application.DTOs.SanPham;

public class SanPhamFilterRequest
{
    public string? Search { get; set; }

    public int? DanhMucID { get; set; }

    public decimal? MinPrice { get; set; }

    public decimal? MaxPrice { get; set; }

    public int? KichThuocID { get; set; }

    public int? MauSacID { get; set; }
}