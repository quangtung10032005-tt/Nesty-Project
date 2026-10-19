using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nesty.Application.DTOs.Auth
{
    public class LoginRequest
    {
        public string TenDangNhap { get; set; } = string.Empty;

        public string MatKhau { get; set; } = string.Empty;
    }
}
