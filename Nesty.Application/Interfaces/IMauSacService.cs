using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Nesty.Application.DTOs.MauSac;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Nesty.Application.Interfaces
{
    public interface IMauSacService
    {
        Task<List<MauSacDto>> GetAllAsync();
        Task<MauSacDto?> GetByIdAsync(int id);
        Task<MauSacDto> CreateAsync(CreateMauSacRequest request);
        Task<MauSacDto?> UpdateAsync(int id, UpdateMauSacRequest request);
        Task<bool> DeleteAsync(int id);
    }
}