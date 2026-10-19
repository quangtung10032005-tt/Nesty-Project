using Nesty.Application.DTOs.HinhAnh;
using Nesty.Application.Interfaces;
using Nesty.Domain.Entities;
namespace Nesty.Application.Services;
public class HinhAnhService : IHinhAnhService
{
    private readonly IUnitOfWork _unitOfWork;
    public HinhAnhService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    public async Task<List<HinhAnhDto>> GetBySanPhamIdAsync(int sanPhamId)
    {
        var hinhAnhs = await _unitOfWork.HinhAnhs.GetBySanPhamIdAsync(sanPhamId);
        return hinhAnhs.Select(x => new HinhAnhDto
        {
            HinhAnhID = x.HinhAnhID,
            SanPhamID = x.SanPhamID,
            DuongDanAnh = x.DuongDanAnh,
            LaAnhChinh = x.LaAnhChinh
        }).ToList();
    }
    public async Task<HinhAnhDto> CreateAsync(CreateHinhAnhRequest request)
    {
        if (request.LaAnhChinh)
        {
            var allImages = await _unitOfWork.HinhAnhs.GetBySanPhamIdAsync(request.SanPhamID);
            foreach (var img in allImages)
            {
                img.LaAnhChinh = false;
                _unitOfWork.HinhAnhs.Update(img);
            }
        }
        var hinhAnh = new HinhAnhSanPham
        {
            SanPhamID = request.SanPhamID,
            DuongDanAnh = request.DuongDanAnh,
            LaAnhChinh = request.LaAnhChinh
        };
        await _unitOfWork.HinhAnhs.AddAsync(hinhAnh);
        await _unitOfWork.SaveChangesAsync();
        return new HinhAnhDto
        {
            HinhAnhID = hinhAnh.HinhAnhID,
            SanPhamID = hinhAnh.SanPhamID,
            DuongDanAnh = hinhAnh.DuongDanAnh,
            LaAnhChinh = hinhAnh.LaAnhChinh
        };
    }
    public async Task<HinhAnhDto?> UpdateAsync(int id, UpdateHinhAnhRequest request)
    {
        var hinhAnh = await _unitOfWork.HinhAnhs.GetByIdAsync(id);
        if (hinhAnh == null) return null;
        if (request.LaAnhChinh && !hinhAnh.LaAnhChinh)
        {
            var allImages = await _unitOfWork.HinhAnhs.GetBySanPhamIdAsync(hinhAnh.SanPhamID);
            foreach (var img in allImages)
            {
                if (img.HinhAnhID != id)
                {
                    img.LaAnhChinh = false;
                    _unitOfWork.HinhAnhs.Update(img);
                }
            }
        }
        hinhAnh.DuongDanAnh = request.DuongDanAnh;
        hinhAnh.LaAnhChinh = request.LaAnhChinh;
        _unitOfWork.HinhAnhs.Update(hinhAnh);
        await _unitOfWork.SaveChangesAsync();
        return new HinhAnhDto
        {
            HinhAnhID = hinhAnh.HinhAnhID,
            SanPhamID = hinhAnh.SanPhamID,
            DuongDanAnh = hinhAnh.DuongDanAnh,
            LaAnhChinh = hinhAnh.LaAnhChinh
        };
    }
    public async Task<bool> DeleteAsync(int id)
    {
        var hinhAnh = await _unitOfWork.HinhAnhs.GetByIdAsync(id);
        if (hinhAnh == null) return false;
        _unitOfWork.HinhAnhs.Delete(hinhAnh);
        await _unitOfWork.SaveChangesAsync();
        return true;
    }
}