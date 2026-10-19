using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Nesty.Domain.Entities;

namespace Nesty.Application.Interfaces.Repositories;

public interface IKhachHangRepository
    : IRepository<KhachHang>
{
    Task<KhachHang?> GetByTaiKhoanIdAsync(
        int taiKhoanId);

    // day 10
    Task<List<KhachHang>> GetAllCustomersAsync();
    Task<KhachHang?> GetCustomerWithOrdersAsync(int khachHangId);
}
