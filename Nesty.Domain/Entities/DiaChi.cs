namespace Nesty.Domain.Entities;

public class DiaChi
{
    public int DiaChiID { get; set; }

    public int KhachHangID { get; set; }

    public string HoTenNguoiNhan { get; set; } = string.Empty;

    public string SoDienThoai { get; set; } = string.Empty;

    public string TinhThanh { get; set; } = string.Empty;

    public string QuanHuyen { get; set; } = string.Empty;

    public string PhuongXa { get; set; } = string.Empty;

    public string DiaChiChiTiet { get; set; } = string.Empty;

    public bool MacDinh { get; set; }



    public  KhachHang KhachHang { get; set; } = null!;

}