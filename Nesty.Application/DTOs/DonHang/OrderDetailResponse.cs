namespace Nesty.Application.DTOs.DonHang;

public class OrderDetailResponse
{
    public int DonHangID { get; set; }
    public string MaDonHang { get; set; } = string.Empty;
    public DateTime NgayDat { get; set; }
    public decimal TongTien { get; set; }
    public string TrangThaiDonHang { get; set; } = string.Empty;

    public string HoTenNguoiNhan { get; set; } = string.Empty;
    public string SoDienThoaiNhan { get; set; } = string.Empty;
    public string DiaChiNhan { get; set; } = string.Empty;

    public List<OrderDetailItemResponse> Items { get; set; } = new();
}

public class OrderDetailItemResponse
{
    public int BienTheID { get; set; }
    public string TenSanPham { get; set; } = string.Empty;
    public string KichThuoc { get; set; } = string.Empty;
    public string MauSac { get; set; } = string.Empty;
    public decimal DonGia { get; set; }
    public int SoLuong { get; set; }
    public decimal ThanhTien { get; set; }
}