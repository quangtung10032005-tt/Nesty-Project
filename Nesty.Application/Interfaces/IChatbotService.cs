using Nesty.Application.DTOs.Customer.Chatbot;

namespace Nesty.Application.Interfaces.Services;

public interface IChatbotService
{
    Task<string> ProcessMessageAsync(ChatRequest request);
}