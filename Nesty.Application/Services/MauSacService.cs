using Nesty.Application.DTOs.MauSac;
using Nesty.Application.Interfaces;
using Nesty.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nesty.Application.Services
{
    public class MauSacService : IMauSacService
    {
        private readonly IUnitOfWork _unitOfWork;

        public MauSacService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<MauSacDto>> GetAllAsync()
        {
            var data = await _unitOfWork.MauSacs.GetAllAsync();
            return data.Select(x => new MauSacDto
            {
                MauSacID = x.MauSacID,
                TenMau = x.TenMau,
                MaMau = x.MaMau,
                TrangThai = x.TrangThai
            }).ToList();
        }

        public async Task<MauSacDto?> GetByIdAsync(int id)
        {
            var entity = await _unitOfWork.MauSacs.GetByIdAsync(id);
            if (entity == null) return null;

            return new MauSacDto
            {
                MauSacID = entity.MauSacID,
                TenMau = entity.TenMau,
                MaMau = entity.MaMau,
                TrangThai = entity.TrangThai
            };
        }

        public async Task<MauSacDto> CreateAsync(CreateMauSacRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.TenMau))
                throw new ArgumentException("Tên màu không được để trống.");

            var exists = await _unitOfWork.MauSacs.FirstOrDefaultAsync(x => x.TenMau == request.TenMau);
            if (exists != null)
                throw new ArgumentException("Tên màu đã tồn tại.");

            var entity = new MauSac
            {
                TenMau = request.TenMau.Trim(),
                MaMau = request.MaMau?.Trim(),
                TrangThai = true
            };

            await _unitOfWork.MauSacs.AddAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            return new MauSacDto
            {
                MauSacID = entity.MauSacID,
                TenMau = entity.TenMau,
                MaMau = entity.MaMau,
                TrangThai = entity.TrangThai
            };
        }

        public async Task<MauSacDto?> UpdateAsync(int id, UpdateMauSacRequest request)
        {
            var entity = await _unitOfWork.MauSacs.GetByIdAsync(id);
            if (entity == null) return null;

            entity.TenMau = request.TenMau.Trim();
            entity.MaMau = request.MaMau?.Trim();

            _unitOfWork.MauSacs.Update(entity);
            await _unitOfWork.SaveChangesAsync();

            return new MauSacDto
            {
                MauSacID = entity.MauSacID,
                TenMau = entity.TenMau,
                MaMau = entity.MaMau,
                TrangThai = entity.TrangThai
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _unitOfWork.MauSacs.GetByIdAsync(id);
            if (entity == null) return false;

            entity.TrangThai = false;
            _unitOfWork.MauSacs.Update(entity);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }
    }
}