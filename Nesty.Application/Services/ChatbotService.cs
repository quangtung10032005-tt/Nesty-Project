//using Nesty.Application.DTOs.Customer.Chatbot;
//using Nesty.Application.Interfaces;
//using Nesty.Application.Interfaces.Services;
//using Nesty.Domain.Entities;
//using System.Linq;

//namespace Nesty.Application.Services;

//public class ChatbotService : IChatbotService
//{
//    private readonly IUnitOfWork _unitOfWork;

//    public ChatbotService(IUnitOfWork unitOfWork)
//    {
//        _unitOfWork = unitOfWork;
//    }

//    public async Task<string> ProcessMessageAsync(ChatRequest request)
//    {
//        string botResponse = "Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Vui lòng liên hệ nhân viên để được hỗ trợ.";
//        var faqs = await _unitOfWork.FAQs.GetActiveFAQsAsync();

//        string inputLower = request.NoiDung.ToLower();
//        var inputWords = inputLower.Split(new[] { ' ', '?', '.', ',' }, StringSplitOptions.RemoveEmptyEntries);

//        int maxScore = 0;
//        FAQ? bestMatch = null;

//        foreach (var faq in faqs)
//        {
//            string faqLower = faq.CauHoi.ToLower();
//            var faqWords = faqLower.Split(new[] { ' ', '?', '.', ',' }, StringSplitOptions.RemoveEmptyEntries);

//            // Đếm số lượng từ khóa trùng nhau
//            int score = inputWords.Intersect(faqWords).Count();

//            // Cộng thêm điểm tuyệt đối nếu chứa cụm từ chính xác
//            if (inputLower.Contains(faqLower) || faqLower.Contains(inputLower))
//            {
//                score += 10;
//            }

//            if (score > maxScore)
//            {
//                maxScore = score;
//                bestMatch = faq;
//            }
//        }

//        // Yêu cầu có ít nhất 2 từ khóa trùng khớp để kích hoạt câu trả lời
//        if (bestMatch != null && maxScore >= 2)
//        {
//            botResponse = bestMatch.CauTraLoi;
//        }

//        var cuocHoiThoai = new CuocHoiThoai
//        {
//            KhachHangID = request.KhachHangID,
//            ThoiGianBatDau = DateTime.Now,
//            TrangThai = "Đang diễn ra"
//        };
//        await _unitOfWork.CuocHoiThoais.AddAsync(cuocHoiThoai);
//        await _unitOfWork.SaveChangesAsync();

//        var userMsg = new TinNhanChatbot
//        {
//            CuocHoiThoaiID = cuocHoiThoai.CuocHoiThoaiID,
//            NguoiGui = "Customer",
//            NoiDung = request.NoiDung,
//            ThoiGianGui = DateTime.Now
//        };
//        var botMsg = new TinNhanChatbot
//        {
//            CuocHoiThoaiID = cuocHoiThoai.CuocHoiThoaiID,
//            NguoiGui = "Bot",
//            NoiDung = botResponse,
//            ThoiGianGui = DateTime.Now
//        };

//        await _unitOfWork.TinNhanChatbots.AddAsync(userMsg);
//        await _unitOfWork.TinNhanChatbots.AddAsync(botMsg);
//        await _unitOfWork.SaveChangesAsync();

//        return botResponse;
//    }
//}










using Nesty.Application.DTOs.Customer.Chatbot;
using Nesty.Application.Interfaces;
using Nesty.Application.Interfaces.Services;
using Nesty.Domain.Entities;
using System.Text;
using System.Text.RegularExpressions;
using System.Globalization;

namespace Nesty.Application.Services;

public class ChatbotService : IChatbotService
{
    private readonly IUnitOfWork _unitOfWork;

    public ChatbotService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    // BƯỚC 1: Hàm chuẩn hóa văn bản (Bỏ dấu tiếng Việt, viết thường, xóa ký tự đặc biệt)
    private string NormalizeText(string text)
    {
        if (string.IsNullOrWhiteSpace(text)) return string.Empty;

        // Chuyển chữ thường
        text = text.ToLower().Trim();

        // Xóa dấu tiếng Việt bằng FormD
        var normalizedString = text.Normalize(NormalizationForm.FormD);
        var stringBuilder = new StringBuilder();

        foreach (var c in normalizedString)
        {
            var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
            if (unicodeCategory != UnicodeCategory.NonSpacingMark)
            {
                stringBuilder.Append(c);
            }
        }
        var cleanText = stringBuilder.ToString().Normalize(NormalizationForm.FormC);
        cleanText = cleanText.Replace("đ", "d");

        // Xóa các ký tự đặc biệt, chỉ giữ lại chữ cái, số và khoảng trắng
        cleanText = Regex.Replace(cleanText, @"[^a-z0-9\s]", "");

        return cleanText;
    }

    public async Task<string> ProcessMessageAsync(ChatRequest request)
    {
        string botResponse = "Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Vui lòng liên hệ nhân viên để được hỗ trợ.";
        var faqs = await _unitOfWork.FAQs.GetActiveFAQsAsync();

        // BƯỚC 2: Chuẩn hóa câu hỏi của khách hàng
        string normalizedInput = NormalizeText(request.NoiDung);
        var inputTokens = normalizedInput.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

        double maxScore = 0;
        FAQ? bestMatch = null;

        // BƯỚC 3 & 4: Keyword Matching & Tính điểm tương đồng (Jaccard Similarity)
        foreach (var faq in faqs)
        {
            string normalizedFaq = NormalizeText(faq.CauHoi);
            var faqTokens = normalizedFaq.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

            // Tính số từ trùng lặp (Intersection) và tổng số từ duy nhất (Union)
            double matchCount = inputTokens.Intersect(faqTokens).Count();
            double unionCount = inputTokens.Union(faqTokens).Count();

            // Công thức Jaccard: Điểm = Số từ trùng / Tổng số từ
            double score = unionCount > 0 ? matchCount / unionCount : 0;

            // Thưởng điểm (Weight) nếu khách hàng gõ nguyên cụm từ dính liền giống FAQ
            if (normalizedInput.Contains(normalizedFaq) || normalizedFaq.Contains(normalizedInput))
            {
                score += 0.5;
            }

            // Ghi nhận FAQ có điểm cao nhất
            if (score > maxScore)
            {
                maxScore = score;
                bestMatch = faq;
            }
        }

        // BƯỚC 5: Lấy FAQ có điểm cao nhất (Thiết lập ngưỡng điểm tối thiểu để không trả lời bừa)
        // Ngưỡng 0.25 tương đương với việc khớp khoảng 25% ngữ nghĩa trở lên
        if (bestMatch != null && maxScore >= 0.25)
        {
            botResponse = bestMatch.CauTraLoi;
        }

        // --- ĐOẠN DƯỚI NÀY GIỮ NGUYÊN (Lưu CSDL) ---
        var cuocHoiThoai = new CuocHoiThoai
        {
            KhachHangID = request.KhachHangID,
            ThoiGianBatDau = DateTime.Now,
            TrangThai = "Đang diễn ra"
        };
        await _unitOfWork.CuocHoiThoais.AddAsync(cuocHoiThoai);
        await _unitOfWork.SaveChangesAsync();

        var userMsg = new TinNhanChatbot
        {
            CuocHoiThoaiID = cuocHoiThoai.CuocHoiThoaiID,
            NguoiGui = "Customer",
            NoiDung = request.NoiDung,
            ThoiGianGui = DateTime.Now
        };
        var botMsg = new TinNhanChatbot
        {
            CuocHoiThoaiID = cuocHoiThoai.CuocHoiThoaiID,
            NguoiGui = "Bot",
            NoiDung = botResponse,
            ThoiGianGui = DateTime.Now
        };

        await _unitOfWork.TinNhanChatbots.AddAsync(userMsg);
        await _unitOfWork.TinNhanChatbots.AddAsync(botMsg);
        await _unitOfWork.SaveChangesAsync();

        return botResponse;
    }
}











