using Nesty.Application.DTOs.Admin.FAQ;

namespace Nesty.Application.Interfaces.Services;

public interface IFAQService
{
    Task<List<FAQDto>> GetAllAsync();
    Task<bool> CreateAsync(FAQDto request);
    Task<bool> UpdateAsync(int id, FAQDto request);
    Task<bool> DeleteAsync(int id);
}