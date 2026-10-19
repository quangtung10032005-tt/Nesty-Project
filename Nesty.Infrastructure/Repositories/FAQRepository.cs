using Microsoft.EntityFrameworkCore;
using Nesty.Application.Interfaces.Repositories;
using Nesty.Domain.Entities;
using Nesty.Infrastructure.Persistence;

namespace Nesty.Infrastructure.Repositories;

public class FAQRepository : Repository<FAQ>, IFAQRepository
{
    private readonly ApplicationDbContext _context;

    public FAQRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<List<FAQ>> GetActiveFAQsAsync()
    {
        return await _context.FAQs.Where(x => x.TrangThai).ToListAsync();
    }
}