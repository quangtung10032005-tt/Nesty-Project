using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nesty.Application.DTOs.HinhAnh
{
    public class HinhAnhDto
    {
        public int HinhAnhID { get; set; }

        public int SanPhamID { get; set; }

        public string DuongDanAnh { get; set; } = string.Empty;

        public bool LaAnhChinh { get; set; }
    }
}
