using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nesty.Application.DTOs.DanhMuc
{
    public class DanhMucDto
    {
        public int DanhMucID { get; set; }

        public string TenDanhMuc { get; set; } = string.Empty;

        public string? MoTa { get; set; }

        public bool TrangThai { get; set; }
    }
}
