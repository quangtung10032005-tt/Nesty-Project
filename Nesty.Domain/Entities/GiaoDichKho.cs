namespace Nesty.Domain.Entities;

public class GiaoDichKho
{
    public int GiaoDichKhoID { get; set; }

    public int TonKhoID { get; set; }

    public string LoaiGiaoDich { get; set; } = string.Empty;

    public int SoLuong { get; set; }

    public DateTime ThoiGian { get; set; }

    public string? LyDo { get; set; }

    public int? ThamChieuID { get; set; }

    public string? GhiChu { get; set; }


    // Navigation
    public  TonKho TonKho { get; set; } = null!;

}