using Nesty.Application.DTOs.GioHang;
using Nesty.Application.Interfaces;
using Nesty.Domain.Entities;

namespace Nesty.Application.Services;

public class GioHangCustomerService : IGioHangCustomerService
{
    private readonly IUnitOfWork _unitOfWork;

    public GioHangCustomerService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<GioHangDto> GetCartAsync(int khachHangId)
    {
        var cart = await _unitOfWork.GioHangs.GetCartWithItemsAsync(khachHangId);

        if (cart == null)
        {
            return new GioHangDto();
        }

        return MapToDto(cart);
    }

    private GioHangDto MapToDto(GioHang cart)
    {
        var items = cart.ChiTietGioHangs
            .Select(item => new GioHangItemDto
            {
                ChiTietGioHangID = item.ChiTietGioHangID,
                BienTheID = item.BienTheID,
                SanPhamID = item.BienTheSanPham.SanPhamID,
                TenSanPham = item.BienTheSanPham.SanPham.TenSanPham,
                DuongDanAnh = item.BienTheSanPham.SanPham.HinhAnhSanPhams?.FirstOrDefault(x => x.LaAnhChinh)?.DuongDanAnh,
                TenKichThuoc = item.BienTheSanPham.KichThuoc.TenKichThuoc,
                TenMau = item.BienTheSanPham.MauSac.TenMau,
                MaMau = item.BienTheSanPham.MauSac.MaMau,
                SKU = item.BienTheSanPham.SKU,
                DonGia = item.BienTheSanPham.GiaBan,
                SoLuong = item.SoLuong,
                ThanhTien = item.BienTheSanPham.GiaBan * item.SoLuong
            })
            .ToList();

        return new GioHangDto
        {
            GioHangID = cart.GioHangID,
            Items = items,
            TongSoLuong = items.Sum(x => x.SoLuong),
            TongTien = items.Sum(x => x.ThanhTien)
        };
    }

    public async Task<GioHangDto> AddToCartAsync(int khachHangId, AddToCartRequest request)
    {
        if (request.SoLuong <= 0)
            throw new ArgumentException("Số lượng phải lớn hơn 0.");

        var cart = await _unitOfWork.GioHangs.GetByKhachHangIdAsync(khachHangId);

        if (cart == null)
        {
            cart = new GioHang
            {
                KhachHangID = khachHangId,
                NgayTao = DateTime.Now,
                NgayCapNhat = DateTime.Now
            };

            await _unitOfWork.GioHangs.AddAsync(cart);
            await _unitOfWork.SaveChangesAsync();
        }

        var existingItem = await _unitOfWork.GioHangs.GetCartItemByVariantAsync(khachHangId, request.BienTheID);

        if (existingItem != null)
        {
            existingItem.SoLuong += request.SoLuong;
        }
        else
        {
            var newItem = new ChiTietGioHang
            {
                GioHangID = cart.GioHangID,
                BienTheID = request.BienTheID,
                SoLuong = request.SoLuong
            };

            await _unitOfWork.GioHangs.AddCartItemAsync(newItem);
        }

        cart.NgayCapNhat = DateTime.Now;
        await _unitOfWork.SaveChangesAsync();

        return await GetCartAsync(khachHangId);
    }

    public async Task<GioHangDto?> UpdateCartItemAsync(int khachHangId, int chiTietGioHangId, UpdateCartItemRequest request)
    {
        if (request.SoLuong <= 0)
            throw new ArgumentException("Số lượng phải lớn hơn 0.");

        var item = await _unitOfWork.GioHangs.GetCartItemAsync(chiTietGioHangId, khachHangId);

        if (item == null)
            return null;

        item.SoLuong = request.SoLuong;
        item.GioHang.NgayCapNhat = DateTime.Now;

        await _unitOfWork.SaveChangesAsync();
        return await GetCartAsync(khachHangId);
    }

    public async Task<GioHangDto?> RemoveCartItemAsync(int khachHangId, int chiTietGioHangId)
    {
        var item = await _unitOfWork.GioHangs.GetCartItemAsync(chiTietGioHangId, khachHangId);

        if (item == null)
            return null;

        item.GioHang.NgayCapNhat = DateTime.Now;
        _unitOfWork.GioHangs.RemoveCartItem(item);

        await _unitOfWork.SaveChangesAsync();
        return await GetCartAsync(khachHangId);
    }
}