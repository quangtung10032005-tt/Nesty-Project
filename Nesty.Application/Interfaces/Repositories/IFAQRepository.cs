using Nesty.Domain.Entities;

namespace Nesty.Application.Interfaces.Repositories;

public interface IFAQRepository : IRepository<FAQ>
{
    Task<List<FAQ>> GetActiveFAQsAsync();
}