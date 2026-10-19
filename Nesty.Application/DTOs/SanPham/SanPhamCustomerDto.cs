namespace Nesty.Application.DTOs.SanPham;

public class SanPhamCustomerDto
{
    public int SanPhamID { get; set; }

    public string TenSanPham { get; set; } = string.Empty;

    public string? MoTa { get; set; }

    public string? ThuongHieu { get; set; }

    public int DanhMucID { get; set; }

    public string TenDanhMuc { get; set; } = string.Empty;

    public string? AnhChinh { get; set; }

    public decimal GiaThapNhat { get; set; }

    public decimal GiaCaoNhat { get; set; }
}