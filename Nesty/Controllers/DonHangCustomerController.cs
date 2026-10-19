using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nesty.Application.DTOs.DonHang;
using Nesty.Application.Interfaces;

namespace Nesty.API.Controllers;

[ApiController]
[Route("api/don-hang")]
[Authorize]
public class DonHangCustomerController : ControllerBase
{
    private readonly IDonHangCustomerService _service;
    private readonly IUnitOfWork _unitOfWork;

    public DonHangCustomerController(
        IDonHangCustomerService service,
        IUnitOfWork unitOfWork)
    {
        _service = service;
        _unitOfWork = unitOfWork;
    }

    // PHẦN 27 — Lấy KhachHangID từ JWT
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

    // PHẦN 28 & 29 — POST tạo đơn
    [HttpPost]
    public async Task<IActionResult> CreateOrder(
        [FromBody] CreateOrderRequest request)
    {
        try
        {
            var khachHangId = await GetKhachHangIdAsync();

            var result = await _service.CreateOrderAsync(
                khachHangId,
                request);

            return Ok(result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // PHẦN 37 — API lấy thông tin Checkout
    [HttpGet("checkout")]
    public async Task<IActionResult> GetCheckout()
    {
        try
        {
            var khachHangId = await GetKhachHangIdAsync();

            var result = await _service.GetCheckoutAsync(khachHangId);

            return Ok(result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // ============================================================
    // DAY 10 — THEO DÕI ĐƠN HÀNG
    // ============================================================

    // GET: /api/don-hang/theo-doi/{maDonHang}
    [HttpGet("theo-doi/{maDonHang}")]
    public async Task<IActionResult> Tracking(string maDonHang)
    {
        try
        {
            var khachHangId = await GetKhachHangIdAsync();

            var result = await _service.GetTrackingAsync(
                khachHangId,
                maDonHang);

            if (result == null)
            {
                return NotFound(new
                {
                    message = "Không tìm thấy đơn hàng."
                });
            }

            return Ok(result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
    }

    // ============================================================
    // DAY 10 — LỊCH SỬ MUA HÀNG
    // ============================================================

    // GET: /api/don-hang/lich-su
    [HttpGet("lich-su")]
    public async Task<IActionResult> History()
    {
        try
        {
            var khachHangId = await GetKhachHangIdAsync();

            var result = await _service.GetHistoryAsync(khachHangId);

            return Ok(result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
    }

    // ============================================================
    // DAY 10 — CHI TIẾT ĐƠN HÀNG
    // ============================================================

    // GET: /api/don-hang/{donHangId}
    [HttpGet("{donHangId:int}")]
    public async Task<IActionResult> Detail(int donHangId)
    {
        try
        {
            var khachHangId = await GetKhachHangIdAsync();

            var result = await _service.GetDetailAsync(
                khachHangId,
                donHangId);

            if (result == null)
            {
                return NotFound(new
                {
                    message = "Không tìm thấy đơn hàng."
                });
            }

            return Ok(result);
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