using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Nesty.Application.DTOs.KichThuoc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Nesty.Application.Interfaces
{
    public interface IKichThuocService
    {
        Task<List<KichThuocDto>> GetAllAsync();
        Task<KichThuocDto?> GetByIdAsync(int id);
        Task<KichThuocDto> CreateAsync(CreateKichThuocRequest request);
        Task<KichThuocDto?> UpdateAsync(int id, UpdateKichThuocRequest request);
        Task<bool> DeleteAsync(int id);
    }
}