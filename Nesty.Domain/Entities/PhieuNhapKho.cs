namespace Nesty.Domain.Entities;

public class PhieuNhapKho
{
    public int PhieuNhapKhoID { get; set; }

    public int KhoID { get; set; }

    public int NhaCungCapID { get; set; }

    public string MaPhieuNhap { get; set; } = string.Empty;

    public DateTime NgayNhap { get; set; }

    public decimal TongTien { get; set; }

    public string? GhiChu { get; set; }


    // Navigation
    public  Kho Kho { get; set; } = null!;
    public  NhaCungCap NhaCungCap { get; set; } = null!;
    public  ICollection<ChiTietPhieuNhapKho> ChiTietPhieuNhapKhos { get; set; } = new List<ChiTietPhieuNhapKho>();


}