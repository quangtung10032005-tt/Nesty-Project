namespace Nesty.Application.DTOs.GioHang;

public class GioHangDto
{
    public int GioHangID { get; set; }

    public List<GioHangItemDto> Items { get; set; }
        = new();

    public int TongSoLuong { get; set; }

    public decimal TongTien { get; set; }
}