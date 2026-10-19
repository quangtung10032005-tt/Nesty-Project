using Nesty.Domain.Entities;

namespace Nesty.Application.Interfaces.Repositories;

public interface ITonKhoRepository
    : IRepository<TonKho>
{
    Task<TonKho?> GetByVariantAsync(int bienTheId);

    Task<TonKho?> GetByKhoAndBienTheAsync(int khoId, int bienTheId);
    Task<List<TonKho>> GetAllTonKhoAsync(int? khoId);
}