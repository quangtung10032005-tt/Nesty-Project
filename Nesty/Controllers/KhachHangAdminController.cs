using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nesty.Application.Interfaces;

namespace Nesty.API.Controllers;

[ApiController]
[Route("api/admin/khach-hang")]
[Authorize(Roles = "Admin")]
public class KhachHangAdminController : ControllerBase
{
    private readonly IKhachHangAdminService _service;

    public KhachHangAdminController(IKhachHangAdminService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAllCustomersAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetDetail(int id)
    {
        var result = await _service.GetCustomerDetailAsync(id);
        if (result == null) return NotFound("Không tìm thấy khách hàng.");
        return Ok(result);
    }
}