using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nesty.Application.DTOs.KichThuoc
{
    public class KichThuocDto
    {
        public int KichThuocID { get; set; }

        public string TenKichThuoc { get; set; } = string.Empty;

        public bool TrangThai { get; set; }
    }
}
