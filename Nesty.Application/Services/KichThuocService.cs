using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nesty.Application.DTOs.KichThuoc;
using Nesty.Application.Interfaces;
using Nesty.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nesty.Application.Services
{
    public class KichThuocService : IKichThuocService
    {
        private readonly IUnitOfWork _unitOfWork;

        public KichThuocService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<KichThuocDto>> GetAllAsync()
        {
            var data = await _unitOfWork.KichThuocs.GetAllAsync();
            return data.Select(x => new KichThuocDto
            {
                KichThuocID = x.KichThuocID,
                TenKichThuoc = x.TenKichThuoc,
                TrangThai = x.TrangThai
            }).ToList();
        }

        public async Task<KichThuocDto?> GetByIdAsync(int id)
        {
            var entity = await _unitOfWork.KichThuocs.GetByIdAsync(id);
            if (entity == null) return null;

            return new KichThuocDto
            {
                KichThuocID = entity.KichThuocID,
                TenKichThuoc = entity.TenKichThuoc,
                TrangThai = entity.TrangThai
            };
        }

        public async Task<KichThuocDto> CreateAsync(CreateKichThuocRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.TenKichThuoc))
                throw new ArgumentException("Tên kích thước không được để trống.");

            var exists = await _unitOfWork.KichThuocs.FirstOrDefaultAsync(x => x.TenKichThuoc == request.TenKichThuoc);
            if (exists != null)
                throw new ArgumentException("Kích thước đã tồn tại.");

            var entity = new KichThuoc
            {
                TenKichThuoc = request.TenKichThuoc.Trim(),
                TrangThai = true
            };

            await _unitOfWork.KichThuocs.AddAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            return new KichThuocDto
            {
                KichThuocID = entity.KichThuocID,
                TenKichThuoc = entity.TenKichThuoc,
                TrangThai = entity.TrangThai
            };
        }

        public async Task<KichThuocDto?> UpdateAsync(int id, UpdateKichThuocRequest request)
        {
            var entity = await _unitOfWork.KichThuocs.GetByIdAsync(id);
            if (entity == null) return null;

            entity.TenKichThuoc = request.TenKichThuoc.Trim();

            _unitOfWork.KichThuocs.Update(entity);
            await _unitOfWork.SaveChangesAsync();

            return new KichThuocDto
            {
                KichThuocID = entity.KichThuocID,
                TenKichThuoc = entity.TenKichThuoc,
                TrangThai = entity.TrangThai
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _unitOfWork.KichThuocs.GetByIdAsync(id);
            if (entity == null) return false;

            entity.TrangThai = false;
            _unitOfWork.KichThuocs.Update(entity);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }
    }
}