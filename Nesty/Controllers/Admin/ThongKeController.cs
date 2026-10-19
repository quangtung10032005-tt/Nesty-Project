using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nesty.Application.Interfaces.Services;

namespace Nesty.API.Controllers.Admin;

[ApiController]
[Route("api/admin/thong-ke")]
[Authorize(Roles = "Admin")]
public class ThongKeController : ControllerBase
{
    private readonly IThongKeService _thongKeService;

    public ThongKeController(IThongKeService thongKeService)
    {
        _thongKeService = thongKeService;
    }

    [HttpGet("tong-quan")]
    public async Task<IActionResult> GetTongQuan()
    {
        return Ok(await _thongKeService.GetBaoCaoTongQuanAsync());
    }
}