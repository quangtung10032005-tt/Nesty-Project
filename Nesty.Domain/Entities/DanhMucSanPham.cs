namespace Nesty.Domain.Entities;

public class DanhMucSanPham
{
    public int DanhMucID { get; set; }

    public string TenDanhMuc { get; set; } = string.Empty;

    public string? MoTa { get; set; }

    public bool TrangThai { get; set; }

    public  ICollection<SanPham> SanPhams { get; set; } = new List<SanPham>();
}