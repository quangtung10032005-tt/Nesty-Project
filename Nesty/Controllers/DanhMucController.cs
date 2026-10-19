using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nesty.Application.DTOs.DanhMuc;
using Nesty.Application.Interfaces;

[ApiController]
[Route("api/admin/danh-muc")]
[Authorize(Roles = "Admin")]
public class DanhMucController : ControllerBase
{
    private readonly IDanhMucService _service;

    public DanhMucController(
        IDanhMucService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result =
            await _service.GetAllAsync();

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result =
            await _service.GetByIdAsync(id);

        if (result == null)
            return NotFound();

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        CreateDanhMucRequest request)
    {
        var result =
            await _service.CreateAsync(request);

        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateDanhMucRequest request)
    {
        var result =
            await _service.UpdateAsync(
                id,
                request);

        if (result == null)
            return NotFound();

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result =
            await _service.DeleteAsync(id);

        if (!result)
            return NotFound();

        return Ok(new
        {
            message = "Đã vô hiệu hóa danh mục."
        });
    }
}