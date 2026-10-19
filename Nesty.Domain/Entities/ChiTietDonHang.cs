namespace Nesty.Domain.Entities;

public class ChiTietDonHang
{
    public int ChiTietDonHangID { get; set; }

    public int DonHangID { get; set; }

    public int BienTheID { get; set; }

    public string TenSanPham { get; set; } = string.Empty;

    public string KichThuoc { get; set; } = string.Empty;

    public string MauSac { get; set; } = string.Empty;

    public decimal DonGia { get; set; }

    public int SoLuong { get; set; }

    public decimal ThanhTien { get; set; }


    // Navigation
    public  DonHang DonHang { get; set; } = null!;
    public  BienTheSanPham BienTheSanPham { get; set; } = null!;
}