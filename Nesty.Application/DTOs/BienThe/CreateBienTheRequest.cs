using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nesty.Application.DTOs.BienThe
{
    public class CreateBienTheRequest
    {
        public int SanPhamID { get; set; }

        public int KichThuocID { get; set; }

        public int MauSacID { get; set; }

        public string SKU { get; set; } = string.Empty;

        public decimal GiaBan { get; set; }
    }
}
