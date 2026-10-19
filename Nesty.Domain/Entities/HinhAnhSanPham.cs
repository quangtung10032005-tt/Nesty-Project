namespace Nesty.Domain.Entities;

public class HinhAnhSanPham
{
    public int HinhAnhID { get; set; }

    public int SanPhamID { get; set; }

    public string DuongDanAnh { get; set; } = string.Empty;

    public bool LaAnhChinh { get; set; }


    public  SanPham SanPham { get; set; } = null!;
}