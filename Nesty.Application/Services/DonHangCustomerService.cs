using Nesty.Application.DTOs.DonHang;
using Nesty.Application.Interfaces;
using Nesty.Domain.Entities;

namespace Nesty.Application.Services;

public class DonHangCustomerService : IDonHangCustomerService
{
    private readonly IUnitOfWork _unitOfWork;

    public DonHangCustomerService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }


    public async Task<CheckoutDto> GetCheckoutAsync(int khachHangId)
    {
        var cart = await _unitOfWork.GioHangs.GetCartWithItemsAsync(khachHangId);

        if (cart == null || cart.ChiTietGioHangs.Count == 0)
        {
            throw new ArgumentException("Giỏ hàng đang trống.");
        }

        var checkoutDto = new CheckoutDto
        {
            TongSoLuong = cart.ChiTietGioHangs.Sum(x => x.SoLuong),
            TongTien = cart.ChiTietGioHangs.Sum(x => x.BienTheSanPham.GiaBan * x.SoLuong),
            Items = cart.ChiTietGioHangs.Select(x => new CheckoutItemDto
            {
                BienTheID = x.BienTheID,
                TenSanPham = x.BienTheSanPham.SanPham.TenSanPham,
                // Lấy ảnh chính của sản phẩm
                DuongDanAnh = x.BienTheSanPham.SanPham.HinhAnhSanPhams?.FirstOrDefault(h => h.LaAnhChinh)?.DuongDanAnh,
                TenKichThuoc = x.BienTheSanPham.KichThuoc.TenKichThuoc,
                TenMau = x.BienTheSanPham.MauSac.TenMau,
                DonGia = x.BienTheSanPham.GiaBan,
                SoLuong = x.SoLuong,
                ThanhTien = x.BienTheSanPham.GiaBan * x.SoLuong
            }).ToList()
        };

        return checkoutDto;
    }

    public async Task<CreateOrderResponse> CreateOrderAsync(int khachHangId, CreateOrderRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.HoTenNguoiNhan)) throw new ArgumentException("Vui lòng nhập họ tên người nhận.");
        if (string.IsNullOrWhiteSpace(request.SoDienThoaiNhan)) throw new ArgumentException("Vui lòng nhập số điện thoại.");
        if (string.IsNullOrWhiteSpace(request.TinhThanhNhan)) throw new ArgumentException("Vui lòng nhập tỉnh/thành.");
        if (string.IsNullOrWhiteSpace(request.QuanHuyenNhan)) throw new ArgumentException("Vui lòng nhập quận/huyện.");
        if (string.IsNullOrWhiteSpace(request.PhuongXaNhan)) throw new ArgumentException("Vui lòng nhập phường/xã.");
        if (string.IsNullOrWhiteSpace(request.DiaChiNhan)) throw new ArgumentException("Vui lòng nhập địa chỉ.");

        var cart = await _unitOfWork.GioHangs.GetCartWithItemsAsync(khachHangId);
        if (cart == null) throw new ArgumentException("Không tìm thấy giỏ hàng.");
        if (cart.ChiTietGioHangs.Count == 0) throw new ArgumentException("Giỏ hàng đang trống.");

        foreach (var item in cart.ChiTietGioHangs)
        {
            var tonKho = await _unitOfWork.TonKhos.GetByVariantAsync(item.BienTheID);
            if (tonKho == null) throw new ArgumentException($"Sản phẩm {item.BienTheSanPham.SanPham.TenSanPham} chưa có thông tin tồn kho.");
            if (tonKho.SoLuongTon < item.SoLuong) throw new ArgumentException($"Sản phẩm {item.BienTheSanPham.SanPham.TenSanPham} không đủ hàng. Còn {tonKho.SoLuongTon} sản phẩm.");
        }

        decimal tongTien = 0;
        foreach (var item in cart.ChiTietGioHangs)
        {
            tongTien += item.BienTheSanPham.GiaBan * item.SoLuong;
        }

        var maDonHang = $"DH{DateTime.Now:yyyyMMddHHmmssfff}";

        await _unitOfWork.BeginTransactionAsync();

        try
        {
            var donHang = new DonHang
            {
                KhachHangID = khachHangId,
                MaDonHang = maDonHang,
                NgayDat = DateTime.Now,
                TongTien = tongTien,
                TrangThaiDonHang = "ChoXacNhan",
                GhiChu = request.GhiChu,
                HoTenNguoiNhan = request.HoTenNguoiNhan,
                SoDienThoaiNhan = request.SoDienThoaiNhan,
                TinhThanhNhan = request.TinhThanhNhan,
                QuanHuyenNhan = request.QuanHuyenNhan,
                PhuongXaNhan = request.PhuongXaNhan,
                DiaChiNhan = request.DiaChiNhan
            };

            await _unitOfWork.DonHangs.AddAsync(donHang);
            await _unitOfWork.SaveChangesAsync();

            foreach (var item in cart.ChiTietGioHangs)
            {
                var chiTiet = new ChiTietDonHang
                {
                    DonHangID = donHang.DonHangID,
                    BienTheID = item.BienTheID,
                    TenSanPham = item.BienTheSanPham.SanPham.TenSanPham,
                    KichThuoc = item.BienTheSanPham.KichThuoc.TenKichThuoc,
                    MauSac = item.BienTheSanPham.MauSac.TenMau,
                    DonGia = item.BienTheSanPham.GiaBan,
                    SoLuong = item.SoLuong,
                    ThanhTien = item.BienTheSanPham.GiaBan * item.SoLuong
                };

                await _unitOfWork.DonHangs.AddOrderDetailAsync(chiTiet);

                var tonKho = await _unitOfWork.TonKhos.GetByVariantAsync(item.BienTheID);
                tonKho!.SoLuongTon -= item.SoLuong;
                tonKho.NgayCapNhat = DateTime.Now;

                var giaoDich = new GiaoDichKho
                {
                    TonKhoID = tonKho.TonKhoID,
                    LoaiGiaoDich = "BAN_HANG",
                    SoLuong = -item.SoLuong,
                    ThoiGian = DateTime.Now,
                    LyDo = "Khách hàng đặt hàng",
                    ThamChieuID = donHang.DonHangID,
                    GhiChu = $"Đơn hàng {donHang.MaDonHang}"
                };

                await _unitOfWork.GiaoDichKhos.AddAsync(giaoDich);
            }

            foreach (var item in cart.ChiTietGioHangs.ToList())
            {
                _unitOfWork.GioHangs.RemoveCartItem(item);
            }
            cart.NgayCapNhat = DateTime.Now;

            await _unitOfWork.SaveChangesAsync();
            await _unitOfWork.CommitTransactionAsync();

            return new CreateOrderResponse
            {
                DonHangID = donHang.DonHangID,
                MaDonHang = donHang.MaDonHang,
                TongTien = donHang.TongTien,
                TrangThaiDonHang = donHang.TrangThaiDonHang,
                Message = "Đặt hàng thành công."
            };
        }
        catch
        {
            await _unitOfWork.RollbackTransactionAsync();
            throw;
        }


    }


































    public async Task<OrderTrackingResponse?> GetTrackingAsync(
       int khachHangId,
       string maDonHang)
    {
        if (string.IsNullOrWhiteSpace(maDonHang))
            throw new ArgumentException("Vui lòng nhập mã đơn hàng.");

        var donHang =
            await _unitOfWork.DonHangs
                .GetByMaDonHangAsync(maDonHang, khachHangId);

        if (donHang == null)
            return null;

        return new OrderTrackingResponse
        {
            DonHangID = donHang.DonHangID,
            MaDonHang = donHang.MaDonHang,
            NgayDat = donHang.NgayDat,
            TongTien = donHang.TongTien,
            TrangThaiDonHang = donHang.TrangThaiDonHang,

            TrangThaiGiaoHang =
                donHang.GiaoHang?.TrangThaiGiaoHang,

            DonViVanChuyen =
                donHang.GiaoHang?.DonViVanChuyen,

            MaVanDon =
                donHang.GiaoHang?.MaVanDon,

            NgayGiao =
                donHang.GiaoHang?.NgayGiao,

            NgayDuKien =
                donHang.GiaoHang?.NgayDuKien,

            NgayNhan =
                donHang.GiaoHang?.NgayNhan
        };
    }

    public async Task<List<OrderHistoryItemResponse>> GetHistoryAsync(
        int khachHangId)
    {
        var orders =
            await _unitOfWork.DonHangs
                .GetHistoryAsync(khachHangId);

        return orders.Select(x => new OrderHistoryItemResponse
        {
            DonHangID = x.DonHangID,
            MaDonHang = x.MaDonHang,
            NgayDat = x.NgayDat,
            TongTien = x.TongTien,
            TrangThaiDonHang = x.TrangThaiDonHang
        }).ToList();
    }

    public async Task<OrderDetailResponse?> GetDetailAsync(
        int khachHangId,
        int donHangId)
    {
        var donHang =
            await _unitOfWork.DonHangs
                .GetDetailAsync(donHangId, khachHangId);

        if (donHang == null)
            return null;

        return new OrderDetailResponse
        {
            DonHangID = donHang.DonHangID,
            MaDonHang = donHang.MaDonHang,
            NgayDat = donHang.NgayDat,
            TongTien = donHang.TongTien,
            TrangThaiDonHang = donHang.TrangThaiDonHang,

            HoTenNguoiNhan = donHang.HoTenNguoiNhan,
            SoDienThoaiNhan = donHang.SoDienThoaiNhan,

            DiaChiNhan =
                $"{donHang.DiaChiNhan}, " +
                $"{donHang.PhuongXaNhan}, " +
                $"{donHang.QuanHuyenNhan}, " +
                $"{donHang.TinhThanhNhan}",

            Items = donHang.ChiTietDonHangs
                .Select(x => new OrderDetailItemResponse
                {
                    BienTheID = x.BienTheID,
                    TenSanPham = x.TenSanPham,
                    KichThuoc = x.KichThuoc,
                    MauSac = x.MauSac,
                    DonGia = x.DonGia,
                    SoLuong = x.SoLuong,
                    ThanhTien = x.ThanhTien
                })
                .ToList()
        };
    }



















}