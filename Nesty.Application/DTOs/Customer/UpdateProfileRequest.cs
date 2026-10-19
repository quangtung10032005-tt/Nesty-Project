using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nesty.Application.DTOs.Customer;

public class UpdateProfileRequest
{
    public string HoTen { get; set; } = string.Empty;

    public string? SoDienThoai { get; set; }

    public string? Email { get; set; }

    public DateTime? NgaySinh { get; set; }

    public string? GioiTinh { get; set; }
}