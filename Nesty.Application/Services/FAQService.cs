using Nesty.Application.DTOs.Admin.FAQ;
using Nesty.Application.Interfaces;
using Nesty.Application.Interfaces.Services;
using Nesty.Domain.Entities;

namespace Nesty.Application.Services;

public class FAQService : IFAQService
{
    private readonly IUnitOfWork _unitOfWork;

    public FAQService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<List<FAQDto>> GetAllAsync()
    {
        var faqs = await _unitOfWork.FAQs.GetAllAsync();
        return faqs.Select(x => new FAQDto
        {
            FAQID = x.FAQID,
            CauHoi = x.CauHoi,
            CauTraLoi = x.CauTraLoi,
            TrangThai = x.TrangThai
        }).ToList();
    }

    public async Task<bool> CreateAsync(FAQDto request)
    {
        var faq = new FAQ
        {
            CauHoi = request.CauHoi,
            CauTraLoi = request.CauTraLoi,
            TrangThai = request.TrangThai,
            NgayTao = DateTime.Now,
            NgayCapNhat = DateTime.Now
        };
        await _unitOfWork.FAQs.AddAsync(faq);
        return await _unitOfWork.SaveChangesAsync() > 0;
    }

    public async Task<bool> UpdateAsync(int id, FAQDto request)
    {
        var faq = await _unitOfWork.FAQs.GetByIdAsync(id);
        if (faq == null) return false;

        faq.CauHoi = request.CauHoi;
        faq.CauTraLoi = request.CauTraLoi;
        faq.TrangThai = request.TrangThai;
        faq.NgayCapNhat = DateTime.Now;

        _unitOfWork.FAQs.Update(faq);
        return await _unitOfWork.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var faq = await _unitOfWork.FAQs.GetByIdAsync(id);
        if (faq == null) return false;

        _unitOfWork.FAQs.Delete(faq);
        return await _unitOfWork.SaveChangesAsync() > 0;
    }
}