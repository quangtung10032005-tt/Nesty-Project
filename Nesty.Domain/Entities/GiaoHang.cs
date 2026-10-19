namespace Nesty.Domain.Entities;

public class GiaoHang
{
    public int GiaoHangID { get; set; }

    public int DonHangID { get; set; }

    public string? DonViVanChuyen { get; set; }

    public string? MaVanDon { get; set; }

    public string TrangThaiGiaoHang { get; set; } = string.Empty;

    public DateTime? NgayGiao { get; set; }

    public DateTime? NgayDuKien { get; set; }

    public DateTime? NgayNhan { get; set; }

    // Navigation: 1 - 1 với DonHang
    public  DonHang DonHang { get; set; } = null!;


}