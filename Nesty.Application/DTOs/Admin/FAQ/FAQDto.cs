namespace Nesty.Application.DTOs.Admin.FAQ;

public class FAQDto
{
    public int FAQID { get; set; }
    public string CauHoi { get; set; } = string.Empty;
    public string CauTraLoi { get; set; } = string.Empty;
    public bool TrangThai { get; set; }
}