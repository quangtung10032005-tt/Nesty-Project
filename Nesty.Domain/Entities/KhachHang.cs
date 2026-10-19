namespace Nesty.Domain.Entities;

public class KhachHang
{
    public int KhachHangID { get; set; }

    public int TaiKhoanID { get; set; }

    public string HoTen { get; set; } = string.Empty;

    public string SoDienThoai { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public DateTime? NgaySinh { get; set; }

    public string? GioiTinh { get; set; }

    public DateTime NgayTao { get; set; }



    //navigation
    public  TaiKhoan TaiKhoan { get; set; } = null!;
    public  GioHang? GioHang { get; set; }
    public  ICollection<DiaChi> DiaChis { get; set; } = new List<DiaChi>();
    public  ICollection<DonHang> DonHangs { get; set; } = new List<DonHang>();
    public  ICollection<CuocHoiThoai> CuocHoiThoais { get; set; } = new List<CuocHoiThoai>();




}