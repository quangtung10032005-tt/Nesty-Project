using Nesty.Application.DTOs.Admin.DonHang;
using Nesty.Application.DTOs.Admin.KhachHang;
using Nesty.Application.Interfaces;

namespace Nesty.Application.Services;

public class KhachHangAdminService : IKhachHangAdminService
{
    private readonly IUnitOfWork _unitOfWork;

    public KhachHangAdminService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<List<AdminCustomerListResponse>> GetAllCustomersAsync()
    {
        var customers = await _unitOfWork.KhachHangs.GetAllCustomersAsync();
        return customers.Select(x => new AdminCustomerListResponse
        {
            KhachHangID = x.KhachHangID,
            HoTen = x.HoTen,
            SoDienThoai = x.SoDienThoai,
            Email = x.Email,
            NgayTao = x.NgayTao,
            SoLuongDonHang = x.DonHangs?.Count ?? 0
        }).ToList();
    }

    public async Task<AdminCustomerDetailResponse?> GetCustomerDetailAsync(int khachHangId)
    {
        var customer = await _unitOfWork.KhachHangs.GetCustomerWithOrdersAsync(khachHangId);
        if (customer == null) return null;

        return new AdminCustomerDetailResponse
        {
            KhachHangID = customer.KhachHangID,
            HoTen = customer.HoTen,
            SoDienThoai = customer.SoDienThoai,
            Email = customer.Email,
            NgaySinh = customer.NgaySinh,
            GioiTinh = customer.GioiTinh,
            NgayTao = customer.NgayTao,
            LichSuDonHang = customer.DonHangs?.OrderByDescending(d => d.NgayDat).Select(d => new AdminOrderListResponse
            {
                DonHangID = d.DonHangID,
                MaDonHang = d.MaDonHang,
                NgayDat = d.NgayDat,
                HoTenNguoiNhan = d.HoTenNguoiNhan,
                TongTien = d.TongTien,
                TrangThaiDonHang = d.TrangThaiDonHang
            }).ToList() ?? new List<AdminOrderListResponse>()
        };
    }
}