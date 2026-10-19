namespace Nesty.Domain.Entities;

public class Kho
{
    public int KhoID { get; set; }

    public string TenKho { get; set; } = string.Empty;

    public string? DiaChi { get; set; }

    public bool TrangThai { get; set; }



    // Navigation
    public  ICollection<PhieuNhapKho> PhieuNhapKhos { get; set; } = new List<PhieuNhapKho>();
    public  ICollection<TonKho> TonKhos { get; set; } = new List<TonKho>();


}