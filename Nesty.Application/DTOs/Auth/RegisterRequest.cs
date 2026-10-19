using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nesty.Application.DTOs.Auth
{
    public class RegisterRequest
    { 
        public string TenDangNhap { get; set; } = string.Empty;

        public string MatKhau { get; set; } = string.Empty;

        public string HoTen { get; set; } = string.Empty;

        public string? SoDienThoai { get; set; }

        public string? Email { get; set; }
    }
}
