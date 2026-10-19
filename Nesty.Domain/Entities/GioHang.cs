namespace Nesty.Domain.Entities;

public class GioHang
{
    public int GioHangID { get; set; }

    public int KhachHangID { get; set; }

    public DateTime NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }


    // Navigation
    public  KhachHang KhachHang { get; set; } = null!;
    public  ICollection<ChiTietGioHang> ChiTietGioHangs { get; set; } = new List<ChiTietGioHang>();


}