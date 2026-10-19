using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nesty.Application.DTOs.SanPham
{
    public class UpdateSanPhamRequest
    {
        public int DanhMucID { get; set; }

        public string TenSanPham { get; set; } = string.Empty;

        public string? MoTa { get; set; }

        public string? ThuongHieu { get; set; }
    }
}
