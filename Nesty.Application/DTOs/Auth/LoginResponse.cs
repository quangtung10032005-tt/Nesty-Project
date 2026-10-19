using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nesty.Application.DTOs.Auth
{
    public class LoginResponse
    {
        public string Token { get; set; } = string.Empty;

        public int TaiKhoanID { get; set; }

        public string TenDangNhap { get; set; } = string.Empty;

        public string VaiTro { get; set; } = string.Empty;
    }
}
