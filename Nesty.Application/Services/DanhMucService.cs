using Nesty.Application.DTOs.DanhMuc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nesty.Application.Interfaces;
using Nesty.Domain.Entities;
namespace Nesty.Application.Services
{
    public class DanhMucService : IDanhMucService
    {
        private readonly IUnitOfWork _unitOfWork;

        public DanhMucService(
            IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<DanhMucDto>> GetAllAsync()
        {
            var danhMucs =
                await _unitOfWork.DanhMucs
                    .GetAllAsync();

            return danhMucs
                .Select(x => new DanhMucDto
                {
                    DanhMucID = x.DanhMucID,
                    TenDanhMuc = x.TenDanhMuc,
                    MoTa = x.MoTa,
                    TrangThai = x.TrangThai
                })
                .ToList();
        }

        public async Task<DanhMucDto?> GetByIdAsync(int id)
        {
            var entity =
                await _unitOfWork.DanhMucs
                    .GetByIdAsync(id);

            if (entity == null)
                return null;

            return new DanhMucDto
            {
                DanhMucID = entity.DanhMucID,
                TenDanhMuc = entity.TenDanhMuc,
                MoTa = entity.MoTa,
                TrangThai = entity.TrangThai
            };
        }

        public async Task<DanhMucDto> CreateAsync(
            CreateDanhMucRequest request)
        {
            if (string.IsNullOrWhiteSpace(
                request.TenDanhMuc))
            {
                throw new ArgumentException(
                    "Tên danh mục không được để trống.");
            }

            var exists =
                await _unitOfWork.DanhMucs
                    .FirstOrDefaultAsync(
                        x => x.TenDanhMuc == request.TenDanhMuc);

            if (exists != null)
            {
                throw new ArgumentException(
                    "Tên danh mục đã tồn tại.");
            }

            var entity = new DanhMucSanPham
            {
                TenDanhMuc = request.TenDanhMuc.Trim(),
                MoTa = request.MoTa,
                TrangThai = true
            };

            await _unitOfWork.DanhMucs
                .AddAsync(entity);

            await _unitOfWork
                .SaveChangesAsync();

            return new DanhMucDto
            {
                DanhMucID = entity.DanhMucID,
                TenDanhMuc = entity.TenDanhMuc,
                MoTa = entity.MoTa,
                TrangThai = entity.TrangThai
            };
        }
    


    public async Task<DanhMucDto?> UpdateAsync(
        int id,
        UpdateDanhMucRequest request)
        {
            var entity =
                await _unitOfWork.DanhMucs
                    .GetByIdAsync(id);

            if (entity == null)
                return null;

            entity.TenDanhMuc =
                request.TenDanhMuc.Trim();

            entity.MoTa =
                request.MoTa;

            _unitOfWork.DanhMucs
                .Update(entity);

            await _unitOfWork
                .SaveChangesAsync();

            return new DanhMucDto
            {
                DanhMucID = entity.DanhMucID,
                TenDanhMuc = entity.TenDanhMuc,
                MoTa = entity.MoTa,
                TrangThai = entity.TrangThai
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity =
                await _unitOfWork.DanhMucs
                    .GetByIdAsync(id);

            if (entity == null)
                return false;

            entity.TrangThai = false;

            _unitOfWork.DanhMucs
                .Update(entity);

            await _unitOfWork
                .SaveChangesAsync();

            return true;
        }
    }
}
