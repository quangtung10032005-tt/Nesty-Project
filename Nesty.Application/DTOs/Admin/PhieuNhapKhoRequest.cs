namespace Nesty.Application.DTOs.Admin.Kho;

public class ChiTietNhapKhoRequest
{
    public int BienTheID { get; set; }
    public int SoLuong { get; set; }
    public decimal DonGiaNhap { get; set; }
}

public class PhieuNhapKhoRequest
{
    public int KhoID { get; set; }
    public int NhaCungCapID { get; set; }
    public string GhiChu { get; set; } = string.Empty;
    public List<ChiTietNhapKhoRequest> ChiTiet { get; set; } = new();
}