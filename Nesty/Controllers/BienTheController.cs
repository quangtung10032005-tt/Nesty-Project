using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nesty.Application.DTOs.BienThe;
using Nesty.Application.Interfaces;
namespace Nesty.API.Controllers;
[ApiController]
[Route("api/admin")]
[Authorize(Roles = "Admin")]
public class BienTheController : ControllerBase
{
    private readonly IBienTheService _service;
    public BienTheController(IBienTheService service)
    {
        _service = service;
    }
    [HttpGet("san-pham/{sanPhamId}/bien-the")]
    public async Task<IActionResult> GetBySanPhamId(int sanPhamId)
    {
        return Ok(await _service.GetBySanPhamIdAsync(sanPhamId));
    }
    [HttpPost("bien-the")]
    public async Task<IActionResult> Create(CreateBienTheRequest request)
    {
        return Ok(await _service.CreateAsync(request));
    }
    [HttpPut("bien-the/{id}")]
    public async Task<IActionResult> Update(int id, UpdateBienTheRequest request)
    {
        var result = await _service.UpdateAsync(id, request);
        if (result == null) return NotFound();
        return Ok(result);
    }
    [HttpDelete("bien-the/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _service.DeleteAsync(id);
        if (!result) return NotFound();
        return NoContent();
    }
}