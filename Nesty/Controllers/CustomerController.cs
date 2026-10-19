using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nesty.Application.Interfaces;
using Nesty.Application.DTOs.Customer;
namespace Nesty.API.Controllers;

[ApiController]
[Route("api/customer")]
[Authorize(Roles = "Customer")]
public class CustomerController : ControllerBase
{
    private readonly ICustomerService _customerService;

    public CustomerController(
        ICustomerService customerService)
    {
        _customerService = customerService;
    }

    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        var taiKhoanIdClaim =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(taiKhoanIdClaim))
        {
            return Unauthorized();
        }

        var taiKhoanId =
            int.Parse(taiKhoanIdClaim);

        var profile =
            await _customerService
                .GetProfileAsync(taiKhoanId);

        if (profile == null)
        {
            return NotFound(
                "Không tìm thấy thông tin khách hàng.");
        }

        return Ok(profile);
    }



    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile(
    UpdateProfileRequest request)
    {
        var taiKhoanIdClaim =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(taiKhoanIdClaim))
        {
            return Unauthorized();
        }

        var taiKhoanId =
            int.Parse(taiKhoanIdClaim);

        var result =
            await _customerService
                .UpdateProfileAsync(
                    taiKhoanId,
                    request);

        if (result == null)
        {
            return NotFound(
                "Không tìm thấy thông tin khách hàng.");
        }

        return Ok(result);
    }



}