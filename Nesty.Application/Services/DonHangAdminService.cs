using Nesty.Application.DTOs.Admin.DonHang;
using Nesty.Application.DTOs.DonHang;
using Nesty.Application.Interfaces;

namespace Nesty.Application.Services;

public class DonHangAdminService : IDonHangAdminService
{
    private readonly IUnitOfWork _unitOfWork;

    public DonHangAdminService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<List<AdminOrderListResponse>> GetAllOrdersAsync()
    {
        var orders = await _unitOfWork.DonHangs.GetAllForAdminAsync();
        return orders.Select(x => new AdminOrderListResponse
        {
            DonHangID = x.DonHangID,
            MaDonHang = x.MaDonHang,
            NgayDat = x.NgayDat,
            HoTenNguoiNhan = x.HoTenNguoiNhan,
            TongTien = x.TongTien,
            TrangThaiDonHang = x.TrangThaiDonHang
        }).ToList();
    }

    public async Task<AdminOrderDetailResponse?> GetOrderDetailAsync(int donHangId)
    {
        var donHang = await _unitOfWork.DonHangs.GetDetailForAdminAsync(donHangId);
        if (donHang == null) return null;

        return new AdminOrderDetailResponse
        {
            DonHangID = donHang.DonHangID,
            MaDonHang = donHang.MaDonHang,
            NgayDat = donHang.NgayDat,
            TongTien = donHang.TongTien,
            TrangThaiDonHang = donHang.TrangThaiDonHang,
            HoTenNguoiNhan = donHang.HoTenNguoiNhan,
            SoDienThoaiNhan = donHang.SoDienThoaiNhan,
            DiaChiNhan = $"{donHang.DiaChiNhan}, {donHang.PhuongXaNhan}, {donHang.QuanHuyenNhan}, {donHang.TinhThanhNhan}",
            KhachHangID = donHang.KhachHangID,
            EmailKhachHang = donHang.KhachHang?.Email ?? string.Empty,
            TrangThaiGiaoHang = donHang.GiaoHang?.TrangThaiGiaoHang,
            DonViVanChuyen = donHang.GiaoHang?.DonViVanChuyen,
            MaVanDon = donHang.GiaoHang?.MaVanDon,
            Items = donHang.ChiTietDonHangs.Select(x => new OrderDetailItemResponse
            {
                BienTheID = x.BienTheID,
                TenSanPham = x.TenSanPham,
                KichThuoc = x.KichThuoc,
                MauSac = x.MauSac,
                DonGia = x.DonGia,
                SoLuong = x.SoLuong,
                ThanhTien = x.ThanhTien
            }).ToList()
        };
    }

    public async Task<bool> UpdateOrderStatusAsync(int donHangId, UpdateOrderStatusRequest request)
    {
        var donHang = await _unitOfWork.DonHangs.GetByIdAsync(donHangId);
        if (donHang == null) return false;

        donHang.TrangThaiDonHang = request.TrangThai;
        _unitOfWork.DonHangs.Update(donHang);
        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}