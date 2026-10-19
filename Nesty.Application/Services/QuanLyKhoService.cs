using Nesty.Application.DTOs.Admin.Kho;
using Nesty.Application.Interfaces;
using Nesty.Domain.Entities;

namespace Nesty.Application.Services;

public class QuanLyKhoService : IQuanLyKhoService
{
    private readonly IUnitOfWork _unitOfWork;

    public QuanLyKhoService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<bool> NhapKhoAsync(PhieuNhapKhoRequest request)
    {
        // Sử dụng Transaction để đảm bảo tính toàn vẹn dữ liệu nếu có lỗi xảy ra giữa chừng
        await _unitOfWork.BeginTransactionAsync();
        try
        {
            // BƯỚC 1: Lưu phiếu nhập cha trước để EF sinh ra PhieuNhapKhoID
            var phieuNhap = new PhieuNhapKho
            {
                KhoID = request.KhoID,
                NhaCungCapID = request.NhaCungCapID,
                MaPhieuNhap = "PN" + DateTime.Now.ToString("yyyyMMddHHmmss"),
                NgayNhap = DateTime.Now,
                GhiChu = request.GhiChu,
                TongTien = request.ChiTiet.Sum(x => x.SoLuong * x.DonGiaNhap),
                ChiTietPhieuNhapKhos = new List<ChiTietPhieuNhapKho>() // Khởi tạo list rỗng, không gom chung dữ liệu
            };

            await _unitOfWork.PhieuNhapKhos.AddAsync(phieuNhap);
            await _unitOfWork.SaveChangesAsync(); // Cố định xuống DB, lúc này phieuNhap đã có ID thật

            // BƯỚC 2: Thêm chi tiết phiếu nhập với ID cha đã có
            foreach (var x in request.ChiTiet)
            {
                phieuNhap.ChiTietPhieuNhapKhos.Add(new ChiTietPhieuNhapKho
                {
                    PhieuNhapKhoID = phieuNhap.PhieuNhapKhoID, // Gán cứng khóa ngoại
                    BienTheID = x.BienTheID,
                    SoLuong = x.SoLuong,
                    DonGiaNhap = x.DonGiaNhap,
                    ThanhTien = x.SoLuong * x.DonGiaNhap
                });
            }
            await _unitOfWork.SaveChangesAsync(); // EF tự động insert các bản ghi chi tiết mới

            // BƯỚC 3: Xử lý Tồn kho và Giao dịch kho
            foreach (var item in request.ChiTiet)
            {
                var tonKho = await _unitOfWork.TonKhos.GetByKhoAndBienTheAsync(request.KhoID, item.BienTheID);

                if (tonKho == null)
                {
                    tonKho = new TonKho
                    {
                        KhoID = request.KhoID,
                        BienTheID = item.BienTheID,
                        SoLuongTon = item.SoLuong,
                        NgayCapNhat = DateTime.Now
                    };
                    await _unitOfWork.TonKhos.AddAsync(tonKho);
                    await _unitOfWork.SaveChangesAsync(); // Lấy TonKhoID mới để gán cho Giao dịch
                }
                else
                {
                    tonKho.SoLuongTon += item.SoLuong;
                    tonKho.NgayCapNhat = DateTime.Now;
                    _unitOfWork.TonKhos.Update(tonKho);
                }

                var giaoDich = new GiaoDichKho
                {
                    TonKhoID = tonKho.TonKhoID,
                    LoaiGiaoDich = "NHẬP KHO",
                    SoLuong = item.SoLuong,
                    ThoiGian = DateTime.Now,
                    LyDo = "Nhập hàng theo phiếu " + phieuNhap.MaPhieuNhap
                };
                await _unitOfWork.GiaoDichKhos.AddAsync(giaoDich);
            }

            // BƯỚC 4: Lưu lần cuối và Xác nhận (Commit) Transaction
            await _unitOfWork.SaveChangesAsync();
            await _unitOfWork.CommitTransactionAsync();

            return true;
        }
        catch
        {
            // Hủy bỏ toàn bộ thao tác nếu có lỗi (tránh việc bảng cha có mà bảng con không có)
            await _unitOfWork.RollbackTransactionAsync();
            throw;
        }
    }

    public async Task<List<TonKhoResponse>> LayTonKhoAsync(int? khoId)
    {
        var tonKhos = await _unitOfWork.TonKhos.GetAllTonKhoAsync(khoId);
        return tonKhos.Select(x => new TonKhoResponse
        {
            TonKhoID = x.TonKhoID,
            KhoID = x.KhoID,
            TenKho = x.Kho?.TenKho ?? string.Empty,
            BienTheID = x.BienTheID,
            TenSanPham = x.BienTheSanPham?.SanPham?.TenSanPham ?? string.Empty,
            KichThuoc = x.BienTheSanPham?.KichThuoc?.TenKichThuoc ?? string.Empty,
            MauSac = x.BienTheSanPham?.MauSac?.TenMau ?? string.Empty,
            SoLuongTon = x.SoLuongTon,
            NgayCapNhat = x.NgayCapNhat
        }).ToList();
    }
}