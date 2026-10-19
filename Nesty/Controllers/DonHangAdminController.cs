using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nesty.Application.DTOs.Admin.DonHang;
using Nesty.Application.Interfaces;

namespace Nesty.API.Controllers;

[ApiController]
[Route("api/admin/don-hang")]
[Authorize(Roles = "Admin")]
public class DonHangAdminController : ControllerBase
{
    private readonly IDonHangAdminService _service;

    public DonHangAdminController(IDonHangAdminService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAllOrdersAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetDetail(int id)
    {
        var result = await _service.GetOrderDetailAsync(id);
        if (result == null) return NotFound("Không tìm thấy đơn hàng.");
        return Ok(result);
    }

    [HttpPut("{id:int}/trang-thai")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateOrderStatusRequest request)
    {
        var success = await _service.UpdateOrderStatusAsync(id, request);
        if (!success) return NotFound("Không tìm thấy đơn hàng.");
        return Ok(new { message = "Cập nhật trạng thái thành công" });
    }
}