namespace Nesty.Domain.Entities;

public class CuocHoiThoai
{
    public int CuocHoiThoaiID { get; set; }

    public int KhachHangID { get; set; }

    public DateTime ThoiGianBatDau { get; set; }

    public DateTime? ThoiGianKetThuc { get; set; }

    public string TrangThai { get; set; } = string.Empty;

    public  KhachHang KhachHang { get; set; } = null!;
    public  ICollection<TinNhanChatbot> TinNhanChatbots { get; set; } = new List<TinNhanChatbot>();
}


