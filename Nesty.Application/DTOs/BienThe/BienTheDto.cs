using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nesty.Application.DTOs.BienThe
{
    public class BienTheDto
    {
        public int BienTheID { get; set; }

        public int SanPhamID { get; set; }

        public int KichThuocID { get; set; }

        public string TenKichThuoc { get; set; } = string.Empty;

        public int MauSacID { get; set; }

        public string TenMau { get; set; } = string.Empty;

        public string SKU { get; set; } = string.Empty;

        public decimal GiaBan { get; set; }

        public bool TrangThai { get; set; }
    }
}
