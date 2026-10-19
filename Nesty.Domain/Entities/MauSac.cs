namespace Nesty.Domain.Entities;

public class MauSac
{
    public int MauSacID { get; set; }

    public string TenMau { get; set; } = string.Empty;

    public string? MaMau { get; set; }

    public bool TrangThai { get; set; }

    public  ICollection<BienTheSanPham> BienTheSanPhams { get; set; } = new List<BienTheSanPham>();
}
