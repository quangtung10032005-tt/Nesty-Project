import React, { useState } from "react";
import { sendMessageToBot } from "../../api/chatbotApi";

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" }
    ]);
    const [input, setInput] = useState("");

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userText = input;
        setMessages(prev => [...prev, { sender: "user", text: userText }]);
        setInput("");

        try {
            // Tạm fix cứng khachHangID = 1 để test, sau này lấy từ Auth Context nếu cần
            const res = await sendMessageToBot({ khachHangID: 1, noiDung: userText });
            setMessages(prev => [...prev, { sender: "bot", text: res.data.message }]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: "bot", text: "Xin lỗi, hiện tại hệ thống chat đang gián đoạn." }]);
        }
    };

    return (
        <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        padding: "15px 20px", borderRadius: "50%", backgroundColor: "#007bff",
                        color: "white", border: "none", cursor: "pointer", fontSize: "16px",
                        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
                    }}
                >
                    💬 Chat
                </button>
            ) : (
                <div style={{
                    width: "300px", height: "400px", backgroundColor: "white",
                    border: "1px solid #ccc", borderRadius: "8px", display: "flex",
                    flexDirection: "column", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
                }}>
                    <div style={{ padding: "10px", backgroundColor: "#007bff", color: "white", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", display: "flex", justifyContent: "space-between" }}>
                        <strong>Nesty Support</strong>
                        <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>X</button>
                    </div>

                    <div style={{ flex: 1, padding: "10px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{ alignSelf: msg.sender === "user" ? "flex-end" : "flex-start", backgroundColor: msg.sender === "user" ? "#dcf8c6" : "#f1f0f0", padding: "8px 12px", borderRadius: "15px", maxWidth: "80%" }}>
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSend} style={{ display: "flex", padding: "10px", borderTop: "1px solid #ccc" }}>
                        <input
                            style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Nhập câu hỏi..."
                        />
                        <button type="submit" style={{ marginLeft: "5px", padding: "8px 12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Gửi</button>
                    </form>
                </div>
            )}
        </div>
    );
}