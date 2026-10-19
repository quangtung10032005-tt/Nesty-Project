using Nesty.Domain.Entities;

namespace Nesty.Application.Interfaces.Repositories;

public interface IDonHangRepository
    : IRepository<DonHang>
{
    Task AddOrderDetailAsync(ChiTietDonHang chiTiet);

    // Thêm hàm lấy đơn hàng bằng LINQ
    Task<DonHang?> GetDonHangByIdAsync(int donHangId);


    Task<DonHang?> GetByMaDonHangAsync(
        string maDonHang,
        int khachHangId);

    Task<List<DonHang>> GetHistoryAsync(
        int khachHangId);

    Task<DonHang?> GetDetailAsync(
        int donHangId,
        int khachHangId);




    // ... code Day 10
    Task<List<DonHang>> GetAllForAdminAsync();
    Task<DonHang?> GetDetailForAdminAsync(int donHangId);

}