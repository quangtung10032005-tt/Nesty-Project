using Nesty.Application.DTOs.BienThe;
using Nesty.Application.Interfaces;
using Nesty.Domain.Entities;
namespace Nesty.Application.Services;
public class BienTheService : IBienTheService
{
    private readonly IUnitOfWork _unitOfWork;
    public BienTheService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    public async Task<List<BienTheDto>> GetBySanPhamIdAsync(int sanPhamId)
    {
        var bienThes = await _unitOfWork.BienThes.GetBySanPhamIdAsync(sanPhamId);
        return bienThes.Select(x => new BienTheDto
        {
            BienTheID = x.BienTheID,
            SanPhamID = x.SanPhamID,
            KichThuocID = x.KichThuocID,
            TenKichThuoc = x.KichThuoc?.TenKichThuoc ?? "",
            MauSacID = x.MauSacID,
            TenMau = x.MauSac?.TenMau ?? "",
            SKU = x.SKU,
            GiaBan = x.GiaBan,
            TrangThai = x.TrangThai
        }).ToList();
    }
    public async Task<BienTheDto> CreateAsync(CreateBienTheRequest request)
    {
        var product = await _unitOfWork.SanPhams.GetByIdAsync(request.SanPhamID);
        if (product == null) throw new Exception("Sản phẩm không tồn tại.");
        var size = await _unitOfWork.KichThuocs.GetByIdAsync(request.KichThuocID);
        if (size == null) throw new Exception("Kích thước không tồn tại.");
        var color = await _unitOfWork.MauSacs.GetByIdAsync(request.MauSacID);
        if (color == null) throw new Exception("Màu sắc không tồn tại.");
        var bienThe = new BienTheSanPham
        {
            SanPhamID = request.SanPhamID,
            KichThuocID = request.KichThuocID,
            MauSacID = request.MauSacID,
            SKU = request.SKU,
            GiaBan = request.GiaBan,
            TrangThai = true
        };
        await _unitOfWork.BienThes.AddAsync(bienThe);
        await _unitOfWork.SaveChangesAsync();
        return new BienTheDto
        {
            BienTheID = bienThe.BienTheID,
            SanPhamID = bienThe.SanPhamID,
            KichThuocID = bienThe.KichThuocID,
            MauSacID = bienThe.MauSacID,
            SKU = bienThe.SKU,
            GiaBan = bienThe.GiaBan,
            TrangThai = bienThe.TrangThai
        };
    }
    public async Task<BienTheDto?> UpdateAsync(int id, UpdateBienTheRequest request)
    {
        var bienThe = await _unitOfWork.BienThes.GetByIdAsync(id);
        if (bienThe == null) return null;
        var size = await _unitOfWork.KichThuocs.GetByIdAsync(request.KichThuocID);
        if (size == null) throw new Exception("Kích thước không tồn tại.");
        var color = await _unitOfWork.MauSacs.GetByIdAsync(request.MauSacID);
        if (color == null) throw new Exception("Màu sắc không tồn tại.");
        bienThe.KichThuocID = request.KichThuocID;
        bienThe.MauSacID = request.MauSacID;
        bienThe.SKU = request.SKU;
        bienThe.GiaBan = request.GiaBan;
        _unitOfWork.BienThes.Update(bienThe);
        await _unitOfWork.SaveChangesAsync();
        return new BienTheDto
        {
            BienTheID = bienThe.BienTheID,
            SanPhamID = bienThe.SanPhamID,
            KichThuocID = bienThe.KichThuocID,
            MauSacID = bienThe.MauSacID,
            SKU = bienThe.SKU,
            GiaBan = bienThe.GiaBan,
            TrangThai = bienThe.TrangThai
        };
    }
    public async Task<bool> DeleteAsync(int id)
    {
        var bienThe = await _unitOfWork.BienThes.GetByIdAsync(id);
        if (bienThe == null) return false;
        bienThe.TrangThai = false;
        _unitOfWork.BienThes.Update(bienThe);
        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}