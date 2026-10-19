namespace Nesty.Application.DTOs.SanPham;

public class SanPhamDetailDto
{
    public int SanPhamID { get; set; }

    public string TenSanPham { get; set; } = string.Empty;

    public string? MoTa { get; set; }

    public string? ThuongHieu { get; set; }

    public int DanhMucID { get; set; }

    public string TenDanhMuc { get; set; } = string.Empty;

    public List<SanPhamImageDto> HinhAnhs { get; set; }
        = new();

    public List<SanPhamVariantDto> BienThes { get; set; }
        = new();
}