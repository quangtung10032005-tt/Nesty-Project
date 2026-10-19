using Nesty.Application.DTOs.Admin.ThongKe;

namespace Nesty.Application.Interfaces.Services;

public interface IThongKeService
{
    Task<BaoCaoThongKeResponse> GetBaoCaoTongQuanAsync();
}