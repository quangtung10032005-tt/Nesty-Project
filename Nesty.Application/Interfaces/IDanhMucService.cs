using Nesty.Application.DTOs.DanhMuc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nesty.Application.Interfaces
{
    public interface IDanhMucService
    {
        Task<List<DanhMucDto>> GetAllAsync();

        Task<DanhMucDto?> GetByIdAsync(int id);

        Task<DanhMucDto> CreateAsync(
            CreateDanhMucRequest request);

        Task<DanhMucDto?> UpdateAsync(
            int id,
            UpdateDanhMucRequest request);

        Task<bool> DeleteAsync(int id);
    }

}
