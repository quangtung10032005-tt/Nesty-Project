using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nesty.Application.DTOs.DanhMuc
{
    public class UpdateDanhMucRequest
    {
        public string TenDanhMuc { get; set; } = string.Empty;

        public string? MoTa { get; set; }
    }
}
