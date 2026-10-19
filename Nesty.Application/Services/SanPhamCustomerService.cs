using Nesty.Application.DTOs.SanPham;
using Nesty.Application.Interfaces;
using Nesty.Application.Interfaces.Repositories;

namespace Nesty.Application.Services;

public class SanPhamCustomerService : ISanPhamCustomerService
{
    private readonly IUnitOfWork _unitOfWork;

    public SanPhamCustomerService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<List<SanPhamCustomerDto>> GetProductsAsync(SanPhamFilterRequest request)
    {
        var products = await _unitOfWork.SanPhams.GetCustomerProductsAsync(
                request.Search,
                request.DanhMucID,
                request.MinPrice,
                request.MaxPrice,
                request.KichThuocID,
                request.MauSacID);

        return products.Select(x => new SanPhamCustomerDto
        {
            SanPhamID = x.SanPhamID,
            TenSanPham = x.TenSanPham,
            MoTa = x.MoTa,
            ThuongHieu = x.ThuongHieu,
            DanhMucID = x.DanhMucID,

            TenDanhMuc = x.DanhMucSanPham.TenDanhMuc,

            AnhChinh = x.HinhAnhSanPhams
                .FirstOrDefault(a => a.LaAnhChinh)
                ?.DuongDanAnh,

            GiaThapNhat = x.BienTheSanPhams
                .Where(b => b.TrangThai)
                .Select(b => b.GiaBan)
                .DefaultIfEmpty()
                .Min(),

            GiaCaoNhat = x.BienTheSanPhams
                .Where(b => b.TrangThai)
                .Select(b => b.GiaBan)
                .DefaultIfEmpty()
                .Max()
        }).ToList();
    }









    public async Task<SanPhamDetailDto?> GetProductDetailAsync(
    int sanPhamId)
    {
        var product =
            await _unitOfWork.SanPhams
                .GetCustomerProductDetailAsync(sanPhamId);

        if (product == null)
            return null;

        return new SanPhamDetailDto
        {
            SanPhamID = product.SanPhamID,

            TenSanPham = product.TenSanPham,

            MoTa = product.MoTa,

            ThuongHieu = product.ThuongHieu,

            DanhMucID = product.DanhMucID,

            TenDanhMuc = product.DanhMucSanPham.TenDanhMuc,

            HinhAnhs = product.HinhAnhSanPhams
                .OrderByDescending(x => x.LaAnhChinh)
                .Select(x => new SanPhamImageDto
                {
                    HinhAnhID = x.HinhAnhID,

                    DuongDanAnh = x.DuongDanAnh,

                    LaAnhChinh = x.LaAnhChinh

                })
                .ToList(),

            BienThes = product.BienTheSanPhams
                .Where(x => x.TrangThai)
                .Select(x => new SanPhamVariantDto
                {
                    BienTheID = x.BienTheID,

                    KichThuocID = x.KichThuocID,

                    TenKichThuoc = x.KichThuoc.TenKichThuoc,

                    MauSacID = x.MauSacID,

                    TenMau = x.MauSac.TenMau,

                    MaMau = x.MauSac.MaMau,

                    SKU = x.SKU,

                    GiaBan = x.GiaBan

                })
                .ToList()
        };
    }














}