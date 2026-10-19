using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nesty.Application.DTOs.SanPham;

[ApiController]
[Route("api/admin/san-pham")]
[Authorize(Roles = "Admin")]
public class SanPhamController : ControllerBase
{
    private readonly ISanPhamService _service;


    public SanPhamController(ISanPhamService service) { _service = service; }



    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? search) => Ok(await _service.GetAllAsync(search));

    [HttpPost]
    public async Task<IActionResult> Create(CreateSanPhamRequest request) => Ok(await _service.CreateAsync(request));

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateSanPhamRequest request)
    {
        var result = await _service.UpdateAsync(id, request);
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _service.DeleteAsync(id);
        if (!result) return NotFound();
        return NoContent();
    }
}