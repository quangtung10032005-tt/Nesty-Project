namespace Nesty.Application.DTOs.Admin.Kho;

public class TonKhoResponse
{
    public int TonKhoID { get; set; }
    public int KhoID { get; set; }
    public string TenKho { get; set; } = string.Empty;
    public int BienTheID { get; set; }
    public string TenSanPham { get; set; } = string.Empty;
    public string KichThuoc { get; set; } = string.Empty;
    public string MauSac { get; set; } = string.Empty;
    public int SoLuongTon { get; set; }
    public DateTime? NgayCapNhat { get; set; }
}