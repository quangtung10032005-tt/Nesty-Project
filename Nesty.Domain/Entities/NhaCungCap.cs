namespace Nesty.Domain.Entities;

public class NhaCungCap
{
    public int NhaCungCapID { get; set; }

    public string TenNhaCungCap { get; set; } = string.Empty;

    public string? SoDienThoai { get; set; }

    public string? Email { get; set; }

    public string? DiaChi { get; set; }

    public bool TrangThai { get; set; }


    // Navigation
    public  ICollection<PhieuNhapKho> PhieuNhapKhos { get; set; } = new List<PhieuNhapKho>();


}