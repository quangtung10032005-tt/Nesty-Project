using Nesty.Application.Interfaces.Repositories;
using Nesty.Domain.Entities;

namespace Nesty.Application.Interfaces;

public interface IUnitOfWork
{
    IKhachHangRepository KhachHangs { get; }
    IRepository<TaiKhoan> TaiKhoans { get; }

    Task<int> SaveChangesAsync();

    // Thêm 3 phương thức xử lý Transaction
    Task BeginTransactionAsync();
    Task CommitTransactionAsync();
    Task RollbackTransactionAsync();

    IDanhMucRepository DanhMucs { get; }
    IKichThuocRepository KichThuocs { get; }
    IMauSacRepository MauSacs { get; }
    ISanPhamRepository SanPhams { get; }
    IBienTheRepository BienThes { get; }
    IHinhAnhRepository HinhAnhs { get; }
    IGioHangRepository GioHangs { get; }

    IDonHangRepository DonHangs { get; }
    ITonKhoRepository TonKhos { get; }
    IRepository<GiaoDichKho> GiaoDichKhos { get; }

    // day 12
    IRepository<PhieuNhapKho> PhieuNhapKhos { get; }

    // Thanh toán
    IRepository<ThanhToan> ThanhToans { get; }

    // day 13
    IFAQRepository FAQs { get; }
    IRepository<CuocHoiThoai> CuocHoiThoais { get; }
    IRepository<TinNhanChatbot> TinNhanChatbots { get; }
}