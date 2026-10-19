namespace Nesty.Application.DTOs.DonHang;

public class CheckoutDto
{
    public List<CheckoutItemDto> Items { get; set; } = new();

    public int TongSoLuong { get; set; }

    public decimal TongTien { get; set; }
}