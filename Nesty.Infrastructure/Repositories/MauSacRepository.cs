using Nesty.Application.Interfaces.Repositories;
using Nesty.Domain.Entities;

using Nesty.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Nesty.Application.Interfaces.Repositories;
using Nesty.Domain.Entities;

namespace Nesty.Infrastructure.Repositories;

public class MauSacRepository
    : Repository<MauSac>,
      IMauSacRepository
{
    public MauSacRepository(
        ApplicationDbContext context)
        : base(context)
    {
    }
}