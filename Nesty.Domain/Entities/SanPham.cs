namespace Nesty.Domain.Entities;

public class SanPham
{
    public int SanPhamID { get; set; }

    public int DanhMucID { get; set; }

    public string TenSanPham { get; set; } = string.Empty;

    public string? MoTa { get; set; }

    public string? ThuongHieu { get; set; }

    public bool TrangThai { get; set; }

    public DateTime NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }



    public  DanhMucSanPham DanhMucSanPham { get; set; } = null!;
    public  ICollection<HinhAnhSanPham> HinhAnhSanPhams { get; set; } = new List<HinhAnhSanPham>();
    public  ICollection<BienTheSanPham> BienTheSanPhams { get; set; } = new List<BienTheSanPham>();


}