namespace Nesty.Domain.Entities;

public class ChiTietPhieuNhapKho
{
    public int ChiTietNhapKhoID { get; set; }

    public int PhieuNhapKhoID { get; set; }

    public int BienTheID { get; set; }

    public int SoLuong { get; set; }

    public decimal DonGiaNhap { get; set; }

    public decimal ThanhTien { get; set; }


    // Navigation
    public  PhieuNhapKho PhieuNhapKho { get; set; } = null!;
    public  BienTheSanPham BienTheSanPham { get; set; } = null!;

}