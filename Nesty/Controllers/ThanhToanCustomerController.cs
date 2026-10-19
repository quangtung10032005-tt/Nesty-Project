using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nesty.Application.DTOs.ThanhToan;
using Nesty.Application.Interfaces;

namespace Nesty.API.Controllers;

[ApiController]
[Route("api/thanh-toan")]
[Authorize]
public class ThanhToanCustomerController : ControllerBase
{
    private readonly IThanhToanCustomerService _service;
    private readonly IUnitOfWork _unitOfWork;

    public ThanhToanCustomerController(
        IThanhToanCustomerService service,
        IUnitOfWork unitOfWork)
    {
        _service = service;
        _unitOfWork = unitOfWork;
    }

    private async Task<int> GetKhachHangIdAsync()
    {
        var value = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(value))
            throw new UnauthorizedAccessException();

        var taiKhoanId = int.Parse(value);

        var khachHang = await _unitOfWork.KhachHangs
            .FirstOrDefaultAsync(x => x.TaiKhoanID == taiKhoanId);

        if (khachHang == null)
        {
            throw new UnauthorizedAccessException(
                "Tài khoản chưa được liên kết với khách hàng nào.");
        }

        return khachHang.KhachHangID;
    }

    [HttpPost("{donHangId:int}")]
    public async Task<IActionResult> CreatePayment(
        int donHangId,
        [FromBody] PaymentRequest request)
    {
        try
        {
            var khachHangId = await GetKhachHangIdAsync();

            var result = await _service.CreatePaymentAsync(
                khachHangId,
                donHangId,
                request);

            return Ok(result);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new
            {
                message = ex.Message
            });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
    }
}