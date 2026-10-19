namespace Nesty.Domain.Entities;

public class FAQ
{
    public int FAQID { get; set; }

    public string CauHoi { get; set; } = string.Empty;

    public string CauTraLoi { get; set; } = string.Empty;

    public bool TrangThai { get; set; }

    public DateTime NgayTao { get; set; }

    public DateTime? NgayCapNhat { get; set; }
}