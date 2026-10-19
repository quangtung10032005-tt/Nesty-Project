using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nesty.Application.DTOs.KichThuoc;
using Nesty.Application.Interfaces;
using System.Threading.Tasks;

namespace Nesty.API.Controllers
{
    [ApiController]
    [Route("api/admin/kich-thuoc")]
    [Authorize(Roles = "Admin")]
    public class KichThuocController : ControllerBase
    {
        private readonly IKichThuocService _service;

        public KichThuocController(IKichThuocService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateKichThuocRequest request)
        {
            var result = await _service.CreateAsync(request);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateKichThuocRequest request)
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
            return Ok(new { message = "Đã vô hiệu hóa kích thước." });
        }
    }
}