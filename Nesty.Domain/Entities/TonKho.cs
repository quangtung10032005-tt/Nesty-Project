namespace Nesty.Domain.Entities;

public class TonKho
{
    public int TonKhoID { get; set; }

    public int KhoID { get; set; }

    public int BienTheID { get; set; }

    public int SoLuongTon { get; set; }

    public DateTime NgayCapNhat { get; set; }

    // Navigation
    public  Kho Kho { get; set; } = null!;
    public  BienTheSanPham BienTheSanPham { get; set; } = null!;
    public  ICollection<GiaoDichKho> GiaoDichKhos { get; set; } = new List<GiaoDichKho>();

}