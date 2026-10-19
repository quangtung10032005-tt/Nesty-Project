using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nesty.Application.DTOs.Admin.Kho;
using Nesty.Application.Interfaces;

namespace Nesty.API.Controllers;

[ApiController]
[Route("api/admin/kho")]
[Authorize(Roles = "Admin")]
public class QuanLyKhoController : ControllerBase
{
    private readonly IQuanLyKhoService _service;

    public QuanLyKhoController(IQuanLyKhoService service)
    {
        _service = service;
    }

    [HttpPost("nhap-kho")]
    public async Task<IActionResult> NhapKho([FromBody] PhieuNhapKhoRequest request)
    {
        var result = await _service.NhapKhoAsync(request);
        if (!result) return BadRequest("Lỗi khi tạo phiếu nhập kho.");
        return Ok(new { message = "Nhập kho và cập nhật tồn kho thành công" });
    }

    [HttpGet("ton-kho")]
    public async Task<IActionResult> GetTonKho([FromQuery] int? khoId)
    {
        return Ok(await _service.LayTonKhoAsync(khoId));
    }
}