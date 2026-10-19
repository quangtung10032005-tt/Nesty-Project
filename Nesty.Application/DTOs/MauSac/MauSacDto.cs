using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nesty.Application.DTOs.MauSac
{
    public class MauSacDto
    {
        public int MauSacID { get; set; }

        public string TenMau { get; set; } = string.Empty;

        public string? MaMau { get; set; }

        public bool TrangThai { get; set; }
    }
}
