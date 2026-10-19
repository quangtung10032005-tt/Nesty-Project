using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nesty.Application.DTOs.Admin.FAQ;
using Nesty.Application.Interfaces.Services;

namespace Nesty.API.Controllers.Admin;

[ApiController]
[Route("api/admin/faq")]
[Authorize(Roles = "Admin")]
public class FAQController : ControllerBase
{
    private readonly IFAQService _faqService;

    public FAQController(IFAQService faqService)
    {
        _faqService = faqService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _faqService.GetAllAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] FAQDto request)
    {
        var result = await _faqService.CreateAsync(request);
        return result ? Ok(new { message = "Thêm FAQ thành công" }) : BadRequest();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] FAQDto request)
    {
        var result = await _faqService.UpdateAsync(id, request);
        return result ? Ok(new { message = "Cập nhật FAQ thành công" }) : BadRequest();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _faqService.DeleteAsync(id);
        return result ? Ok(new { message = "Xóa FAQ thành công" }) : BadRequest();
    }
}