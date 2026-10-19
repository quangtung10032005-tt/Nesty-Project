namespace Nesty.Application.DTOs.DonHang;

public class CreateOrderRequest
{
    public string HoTenNguoiNhan { get; set; } = string.Empty;

    public string SoDienThoaiNhan { get; set; } = string.Empty;

    public string TinhThanhNhan { get; set; } = string.Empty;

    public string QuanHuyenNhan { get; set; } = string.Empty;

    public string PhuongXaNhan { get; set; } = string.Empty;

    public string DiaChiNhan { get; set; } = string.Empty;

    public string? GhiChu { get; set; }
}