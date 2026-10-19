using Nesty.Application.DTOs.Admin.Kho;

namespace Nesty.Application.Interfaces;

public interface IQuanLyKhoService
{
    Task<bool> NhapKhoAsync(PhieuNhapKhoRequest request);
    Task<List<TonKhoResponse>> LayTonKhoAsync(int? khoId);
}