using Nesty.Application.DTOs.Customer;
using Nesty.Application.Interfaces;

namespace Nesty.Application.Services;

public class CustomerService : ICustomerService
{
    private readonly IUnitOfWork _unitOfWork;

    public CustomerService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<CustomerProfileDto?> GetProfileAsync(int taiKhoanId)
    {
        var customer = await _unitOfWork.KhachHangs.GetByTaiKhoanIdAsync(taiKhoanId);

        if (customer == null) return null;

        return new CustomerProfileDto
        {
            KhachHangID = customer.KhachHangID,
            TaiKhoanID = customer.TaiKhoanID,
            HoTen = customer.HoTen,
            SoDienThoai = customer.SoDienThoai,
            Email = customer.Email,
            NgaySinh = customer.NgaySinh,
            GioiTinh = customer.GioiTinh,
            NgayTao = customer.NgayTao
        };
    }

    public async Task<CustomerProfileDto?> UpdateProfileAsync(int taiKhoanId, UpdateProfileRequest request)
    {
        var customer = await _unitOfWork.KhachHangs.GetByTaiKhoanIdAsync(taiKhoanId);

        if (customer == null) return null;

        customer.HoTen = request.HoTen;
        customer.SoDienThoai = request.SoDienThoai;
        customer.Email = request.Email;
        customer.NgaySinh = request.NgaySinh;
        customer.GioiTinh = request.GioiTinh;

        _unitOfWork.KhachHangs.Update(customer);
        await _unitOfWork.SaveChangesAsync();

        return new CustomerProfileDto
        {
            KhachHangID = customer.KhachHangID,
            TaiKhoanID = customer.TaiKhoanID,
            HoTen = customer.HoTen,
            SoDienThoai = customer.SoDienThoai,
            Email = customer.Email,
            NgaySinh = customer.NgaySinh,
            GioiTinh = customer.GioiTinh,
            NgayTao = customer.NgayTao
        };
    }
}