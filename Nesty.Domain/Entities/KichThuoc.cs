namespace Nesty.Domain.Entities;

public class KichThuoc
{
    public int KichThuocID { get; set; }

    public string TenKichThuoc { get; set; } = string.Empty;

    public bool TrangThai { get; set; }


    public  ICollection<BienTheSanPham> BienTheSanPhams { get; set; } = new List<BienTheSanPham>();
}