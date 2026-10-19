namespace Nesty.Domain.Entities;

public class ChiTietGioHang
{
    public int ChiTietGioHangID { get; set; }

    public int GioHangID { get; set; }

    public int BienTheID { get; set; }

    public int SoLuong { get; set; }


    // Navigation
    public  GioHang GioHang { get; set; } = null!;
    public  BienTheSanPham BienTheSanPham { get; set; } = null!;


}