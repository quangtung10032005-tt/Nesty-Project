using Nesty.Application.Interfaces.Repositories;
using Nesty.Domain.Entities;
using Nesty.Infrastructure.Persistence;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nesty.Infrastructure.Repositories;

public class DanhMucRepository
    : Repository<DanhMucSanPham>,
      IDanhMucRepository
{
    public DanhMucRepository(
        ApplicationDbContext context)
        : base(context)
    {
    }
}