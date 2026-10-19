import React, { useState, useEffect } from "react";
import { getFaqs, createFaq, updateFaq, deleteFaq } from "../../api/faqApi";

export default function FaqManagementPage() {
    const [faqs, setFaqs] = useState([]);
    const [form, setForm] = useState({ cauHoi: "", cauTraLoi: "", trangThai: true });
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await getFaqs();
            setFaqs(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateFaq(editingId, form);
            } else {
                await createFaq(form);
            }
            await loadData();
            setShowForm(false);
            setEditingId(null);
            setForm({ cauHoi: "", cauTraLoi: "", trangThai: true });
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (item) => {
        setForm({ cauHoi: item.cauHoi, cauTraLoi: item.cauTraLoi, trangThai: item.trangThai });
        setEditingId(item.faqid || item.faqID); // Tuỳ DB mày trả về hoa hay thường
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Xác nhận xóa câu hỏi FAQ này?")) return;
        try {
            await deleteFaq(id);
            await loadData();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Quản lý nội dung Chatbot (FAQ)</h2>
            <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ cauHoi: "", cauTraLoi: "", trangThai: true }); }}>
                + Thêm câu hỏi mới
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} style={{ marginTop: "10px", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px", maxWidth: "600px" }}>
                    <input
                        placeholder="Câu hỏi của khách (VD: Shop có ship COD không?)"
                        value={form.cauHoi}
                        onChange={e => setForm({ ...form, cauHoi: e.target.value })}
                        required
                        style={{ padding: "8px" }}
                    />
                    <textarea
                        placeholder="Câu trả lời của Bot"
                        value={form.cauTraLoi}
                        onChange={e => setForm({ ...form, cauTraLoi: e.target.value })}
                        required
                        rows="4"
                        style={{ padding: "8px" }}
                    />
                    <div>
                        <label style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                checked={form.trangThai}
                                onChange={e => setForm({ ...form, trangThai: e.target.checked })}
                            /> Hoạt động
                        </label>
                    </div>
                    <div>
                        <button type="submit" style={{ marginRight: "5px", padding: "5px 15px" }}>Lưu</button>
                        <button type="button" onClick={() => setShowForm(false)} style={{ padding: "5px 15px" }}>Hủy</button>
                    </div>
                </form>
            )}

            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Câu hỏi</th>
                        <th>Câu trả lời</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {faqs.map(item => (
                        <tr key={item.faqid || item.faqID}>
                            <td>{item.faqid || item.faqID}</td>
                            <td>{item.cauHoi}</td>
                            <td>{item.cauTraLoi}</td>
                            <td>{item.trangThai ? "Hoạt động" : "Vô hiệu"}</td>
                            <td style={{ minWidth: "120px" }}>
                                <button onClick={() => handleEdit(item)} style={{ marginRight: "10px" }}>Sửa</button>
                                <button onClick={() => handleDelete(item.faqid || item.faqID)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}