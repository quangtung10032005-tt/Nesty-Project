

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nesty.Application.DTOs.GioHang;
using Nesty.Application.Interfaces;
using System.Security.Claims;

namespace Nesty.API.Controllers;

[ApiController]
[Route("api/gio-hang")]
[Authorize]
public class GioHangController : ControllerBase
{
    private readonly IGioHangCustomerService _service;
    private readonly IUnitOfWork _unitOfWork;

    public GioHangController(IGioHangCustomerService service, IUnitOfWork unitOfWork)
    {
        _service = service;
        _unitOfWork = unitOfWork;
    }

    private async Task<int> GetKhachHangIdAsync()
    {
        var taiKhoanId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var khachHang = await _unitOfWork.KhachHangs.FirstOrDefaultAsync(x => x.TaiKhoanID == taiKhoanId);

        if (khachHang == null)
        {
            throw new UnauthorizedAccessException("Tài khoản chưa được liên kết với khách hàng nào.");
        }

        return khachHang.KhachHangID;
    }

    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        try
        {
            var khachHangId = await GetKhachHangIdAsync();
            var result = await _service.GetCartAsync(khachHangId);
            return Ok(result);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }

    [HttpPost("items")]
    public async Task<IActionResult> AddToCart([FromBody] AddToCartRequest request)
    {
        try
        {
            var khachHangId = await GetKhachHangIdAsync();
            var result = await _service.AddToCartAsync(khachHangId, request);
            return Ok(result);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("items/{id:int}")]
    public async Task<IActionResult> UpdateCartItem(int id, [FromBody] UpdateCartItemRequest request)
    {
        try
        {
            var khachHangId = await GetKhachHangIdAsync();
            var result = await _service.UpdateCartItemAsync(khachHangId, id, request);
            if (result == null)
            {
                return NotFound(new { message = "Không tìm thấy sản phẩm trong giỏ hàng." });
            }
            return Ok(result);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("items/{id:int}")]
    public async Task<IActionResult> RemoveCartItem(int id)
    {
        try
        {
            var khachHangId = await GetKhachHangIdAsync();
            var result = await _service.RemoveCartItemAsync(khachHangId, id);

            if (result == null)
            {
                return NotFound(new { message = "Không tìm thấy sản phẩm trong giỏ hàng." });
            }
            return Ok(result);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }
}