namespace Nesty.Domain.Entities;

public class ThanhToan
{
    public int ThanhToanID { get; set; }

    public int DonHangID { get; set; }

    public string PhuongThucThanhToan { get; set; } = string.Empty;

    public decimal SoTien { get; set; }

    public string TrangThaiThanhToan { get; set; } = string.Empty;

    public DateTime? NgayThanhToan { get; set; }

    public string? MaGiaoDich { get; set; }


    // Navigation: 1 - 1 với DonHang
    public  DonHang DonHang { get; set; } = null!;


}