using Nesty.Application.DTOs.ThanhToan;
using Nesty.Application.Interfaces;
using Nesty.Domain.Entities;

namespace Nesty.Application.Services;

public class ThanhToanCustomerService : IThanhToanCustomerService
{
    private readonly IUnitOfWork _unitOfWork;

    public ThanhToanCustomerService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<object> CreatePaymentAsync(
        int khachHangId,
        int donHangId,
        PaymentRequest request)
    {
        var donHang = await _unitOfWork.DonHangs
            .GetDonHangByIdAsync(donHangId);

        if (donHang == null || donHang.KhachHangID != khachHangId)
        {
            throw new ArgumentException(
                "Đơn hàng không tồn tại hoặc bạn không có quyền truy cập.");
        }

        var thanhToan = new ThanhToan
        {
            DonHangID = donHang.DonHangID,
            PhuongThucThanhToan = request.PhuongThucThanhToan,
            SoTien = donHang.TongTien,
            NgayThanhToan = null,
            MaGiaoDich = null
        };

        if (request.PhuongThucThanhToan == "COD")
        {
            thanhToan.TrangThaiThanhToan = "ChoDoiSoat";
        }
        else if (request.PhuongThucThanhToan == "ChuyenKhoan")
        {
            thanhToan.TrangThaiThanhToan = "ChoXuLy";
        }
        else
        {
            throw new ArgumentException(
                "Phương thức thanh toán không hợp lệ.");
        }

        // LƯU THANH TOÁN VÀO DATABASE
        await _unitOfWork.ThanhToans.AddAsync(thanhToan);
        await _unitOfWork.SaveChangesAsync();

        return new
        {
            donHangID = donHang.DonHangID,
            phuongThucThanhToan = thanhToan.PhuongThucThanhToan,
            soTien = thanhToan.SoTien,
            trangThaiThanhToan = thanhToan.TrangThaiThanhToan,
            message = "Đã ghi nhận phương thức thanh toán."
        };
    }
}