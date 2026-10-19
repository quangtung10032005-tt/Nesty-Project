using Nesty.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nesty.Application.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(TaiKhoan taiKhoan);
    }
}
