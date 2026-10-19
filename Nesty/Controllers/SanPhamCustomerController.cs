//using Microsoft.AspNetCore.Mvc;
//using Nesty.Application.DTOs.SanPham;
//using Nesty.Application.Interfaces;

//namespace Nesty.API.Controllers;

//[ApiController]
//[Route("api/san-pham")] // Không có chữ admin và không dùng [Authorize]
//public class SanPhamCustomerController : ControllerBase
//{
//    private readonly ISanPhamCustomerService _service;

//    public SanPhamCustomerController(ISanPhamCustomerService service)
//    {
//        _service = service;
//    }

//    [HttpGet]
//    public async Task<IActionResult> GetProducts([FromQuery] SanPhamFilterRequest request)
//    {
//        var result = await _service.GetProductsAsync(request);
//        return Ok(result);
//    }
//}


using Microsoft.AspNetCore.Mvc;
using Nesty.Application.DTOs.SanPham;
using Nesty.Application.Interfaces;

namespace Nesty.API.Controllers;

[ApiController]
[Route("api/san-pham")] // Dành riêng cho Khách hàng
public class SanPhamCustomerController : ControllerBase
{
    private readonly ISanPhamCustomerService _service;

    public SanPhamCustomerController(ISanPhamCustomerService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts([FromQuery] SanPhamFilterRequest request)
    {
        var result = await _service.GetProductsAsync(request);
        return Ok(result);
    }

    // THÊM PHƯƠNG THỨC NÀY CHO DAY 7
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetProductDetail(int id)
    {
        var result = await _service.GetProductDetailAsync(id);

        if (result == null)
        {
            return NotFound(new
            {
                message = "Không tìm thấy sản phẩm."
            });
        }

        return Ok(result);
    }
}