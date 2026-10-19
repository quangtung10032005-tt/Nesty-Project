namespace Nesty.Domain.Entities;

public class BienTheSanPham
{
    public int BienTheID { get; set; }

    public int SanPhamID { get; set; }

    public int KichThuocID { get; set; }

    public int MauSacID { get; set; }

    public string SKU { get; set; } = string.Empty;

    public decimal GiaBan { get; set; }

    public bool TrangThai { get; set; }


    // Navigation (Lookup)
    public  SanPham SanPham { get; set; } = null!;
    public  KichThuoc KichThuoc { get; set; } = null!;
    public  MauSac MauSac { get; set; } = null!;

    // Navigation (Collections)
    public  ICollection<ChiTietGioHang> ChiTietGioHangs { get; set; } = new List<ChiTietGioHang>();
    public  ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; } = new List<ChiTietDonHang>();
    public  ICollection<ChiTietPhieuNhapKho> ChiTietPhieuNhapKhos { get; set; } = new List<ChiTietPhieuNhapKho>();
    public  ICollection<TonKho> TonKhos { get; set; } = new List<TonKho>();



}