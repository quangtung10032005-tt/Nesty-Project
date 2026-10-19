using BCrypt.Net;
using Nesty.Application.DTOs.Auth;
using Nesty.Application.Interfaces;
using Nesty.Domain.Entities;

namespace Nesty.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IJwtService _jwtService;

    public AuthService(
        IUnitOfWork unitOfWork,
        IJwtService jwtService)
    {
        _unitOfWork = unitOfWork;
        _jwtService = jwtService;
    }

    public async Task<LoginResponse> RegisterAsync(RegisterRequest request)
    {
        var existingUser = await _unitOfWork.TaiKhoans
            .FirstOrDefaultAsync(x => x.TenDangNhap == request.TenDangNhap);

        if (existingUser != null)
        {
            throw new Exception("Tên đăng nhập đã tồn tại");
        }

        var taiKhoan = new TaiKhoan
        {
            TenDangNhap = request.TenDangNhap,
            MatKhau = BCrypt.Net.BCrypt.HashPassword(request.MatKhau),
            VaiTro = "Customer",
            TrangThai = true,
            NgayTao = DateTime.UtcNow
        };

        await _unitOfWork.TaiKhoans.AddAsync(taiKhoan);
        await _unitOfWork.SaveChangesAsync();

        var khachHang = new KhachHang
        {
            TaiKhoanID = taiKhoan.TaiKhoanID,
            HoTen = request.HoTen,
            SoDienThoai = request.SoDienThoai,
            Email = request.Email,
            NgayTao = DateTime.UtcNow
        };

        await _unitOfWork.KhachHangs.AddAsync(khachHang);
        await _unitOfWork.SaveChangesAsync();

        var token = _jwtService.GenerateToken(taiKhoan);

        return new LoginResponse
        {
            Token = token,
            TaiKhoanID = taiKhoan.TaiKhoanID,
            TenDangNhap = taiKhoan.TenDangNhap,
            VaiTro = taiKhoan.VaiTro
        };
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest request)
    {
        var taiKhoan = await _unitOfWork.TaiKhoans
            .FirstOrDefaultAsync(x => x.TenDangNhap == request.TenDangNhap);

        if (taiKhoan == null)
            throw new UnauthorizedAccessException("Sai tên đăng nhập hoặc mật khẩu");

        if (!taiKhoan.TrangThai)
            throw new UnauthorizedAccessException("Tài khoản đã bị khóa");

        var validPassword = BCrypt.Net.BCrypt.Verify(request.MatKhau, taiKhoan.MatKhau);

        if (!validPassword)
            throw new UnauthorizedAccessException("Sai tên đăng nhập hoặc mật khẩu");

        taiKhoan.LanDangNhapCuoi = DateTime.UtcNow;
        _unitOfWork.TaiKhoans.Update(taiKhoan);
        await _unitOfWork.SaveChangesAsync();

        var token = _jwtService.GenerateToken(taiKhoan);

        return new LoginResponse
        {
            Token = token,
            TaiKhoanID = taiKhoan.TaiKhoanID,
            TenDangNhap = taiKhoan.TenDangNhap,
            VaiTro = taiKhoan.VaiTro
        };
    }
}