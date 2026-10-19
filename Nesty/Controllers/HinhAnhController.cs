using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nesty.Application.DTOs.HinhAnh;
using Nesty.Application.Interfaces;
namespace Nesty.API.Controllers;
[ApiController]
[Route("api/admin")]
[Authorize(Roles = "Admin")]
public class HinhAnhController : ControllerBase
{
    private readonly IHinhAnhService _service;
    public HinhAnhController(IHinhAnhService service)
    {
        _service = service;
    }
    [HttpGet("san-pham/{sanPhamId}/hinh-anh")]
    public async Task<IActionResult> GetBySanPhamId(int sanPhamId)
    {
        return Ok(await _service.GetBySanPhamIdAsync(sanPhamId));
    }
    [HttpPost("hinh-anh")]
    public async Task<IActionResult> Create(CreateHinhAnhRequest request)
    {
        return Ok(await _service.CreateAsync(request));
    }
    [HttpPut("hinh-anh/{id}")]
    public async Task<IActionResult> Update(int id, UpdateHinhAnhRequest request)
    {
        var result = await _service.UpdateAsync(id, request);
        if (result == null) return NotFound();
        return Ok(result);
    }
    [HttpDelete("hinh-anh/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _service.DeleteAsync(id);
        if (!result) return NotFound();
        return NoContent();
    }
}