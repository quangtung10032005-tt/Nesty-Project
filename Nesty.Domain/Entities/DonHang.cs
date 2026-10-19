namespace Nesty.Domain.Entities;

public class DonHang
{
    public int DonHangID { get; set; }

    public int KhachHangID { get; set; }

    public string MaDonHang { get; set; } = string.Empty;

    public DateTime NgayDat { get; set; }

    public decimal TongTien { get; set; }

    public string TrangThaiDonHang { get; set; } = string.Empty;

    public string? GhiChu { get; set; }

    public string HoTenNguoiNhan { get; set; } = string.Empty;

    public string SoDienThoaiNhan { get; set; } = string.Empty;

    public string TinhThanhNhan { get; set; } = string.Empty;

    public string QuanHuyenNhan { get; set; } = string.Empty;

    public string PhuongXaNhan { get; set; } = string.Empty;

    public string DiaChiNhan { get; set; } = string.Empty;






    // Navigation
    public  KhachHang KhachHang { get; set; } = null!;
    public  ThanhToan? ThanhToan { get; set; }
    public  GiaoHang? GiaoHang { get; set; }
    public  ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; } = new List<ChiTietDonHang>();





}