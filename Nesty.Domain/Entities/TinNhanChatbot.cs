namespace Nesty.Domain.Entities;

public class TinNhanChatbot
{
    public int TinNhanID { get; set; }

    public int CuocHoiThoaiID { get; set; }

    public string NguoiGui { get; set; } = string.Empty;

    public string NoiDung { get; set; } = string.Empty;

    public DateTime ThoiGianGui { get; set; }


    // Navigation
    public  CuocHoiThoai CuocHoiThoai { get; set; } = null!;
}


