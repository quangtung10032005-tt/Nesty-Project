using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nesty.Application.DTOs.SanPham
{
    public class SanPhamDto
    {
        public int SanPhamID { get; set; }

        public int DanhMucID { get; set; }

        public string TenSanPham { get; set; } = string.Empty;

        public string? MoTa { get; set; }

        public string? ThuongHieu { get; set; }

        public bool TrangThai { get; set; }

        public DateTime NgayTao { get; set; }

        public DateTime? NgayCapNhat { get; set; }
    }
}
