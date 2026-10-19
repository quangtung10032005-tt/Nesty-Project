using Nesty.Application.DTOs.Admin.ThongKe;
using Nesty.Application.Interfaces;
using Nesty.Application.Interfaces.Services;

namespace Nesty.Application.Services;

public class ThongKeService : IThongKeService
{
    private readonly IUnitOfWork _unitOfWork;

    public ThongKeService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<BaoCaoThongKeResponse> GetBaoCaoTongQuanAsync()
    {
        var donHangs = await _unitOfWork.DonHangs.GetAllAsync();
        var tonKhos = await _unitOfWork.TonKhos.GetAllAsync();
        var khachHangs = await _unitOfWork.KhachHangs.GetAllAsync();

        return new BaoCaoThongKeResponse
        {
            TongDoanhThu = donHangs.Where(x => x.TrangThaiDonHang == "Đã giao").Sum(x => x.TongTien),
            TongDonHang = donHangs.Count(),
            SoSanPhamSapHetHang = tonKhos.Count(x => x.SoLuongTon < 10),
            TongKhachHang = khachHangs.Count()
        };
    }
}