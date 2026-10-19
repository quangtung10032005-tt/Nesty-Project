using Microsoft.AspNetCore.Mvc;
using Nesty.Application.DTOs.Customer.Chatbot;
using Nesty.Application.Interfaces.Services;

namespace Nesty.API.Controllers.Customer;

[ApiController]
[Route("api/chatbot")]
public class ChatbotController : ControllerBase
{
    private readonly IChatbotService _chatbotService;

    public ChatbotController(IChatbotService chatbotService)
    {
        _chatbotService = chatbotService;
    }

    [HttpPost("gui-tin-nhan")]
    public async Task<IActionResult> SendMessage([FromBody] ChatRequest request)
    {
        var response = await _chatbotService.ProcessMessageAsync(request);
        return Ok(new { message = response });
    }
}