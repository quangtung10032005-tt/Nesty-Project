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
        <div style={styles.container}>
            {/* Header tiêu đề trang */}
            <div style={styles.pageHeader}>
                <div>
                    <h2 style={styles.title}>Quản lý nội dung Chatbot (FAQ)</h2>
                    {/* <p style={styles.subtitle}>Cấu hình câu hỏi thường gặp và câu trả lời tự động cho khách hàng</p> */}
                </div>
                <button 
                    onClick={() => { setShowForm(true); setEditingId(null); setForm({ cauHoi: "", cauTraLoi: "", trangThai: true }); }}
                    style={styles.btnAdd}
                >
                    + Thêm câu hỏi mới
                </button>
            </div>

            {/* Form Thêm / Sửa dạng Card */}
            {showForm && (
                <div style={styles.formCard}>
                    <h3 style={styles.formTitle}>{editingId ? "Cập nhật câu hỏi FAQ" : "Thêm câu hỏi mới"}</h3>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Câu hỏi của khách hàng:</label>
                            <input
                                placeholder="VD: Shop có ship COD không?"
                                value={form.cauHoi}
                                onChange={e => setForm({ ...form, cauHoi: e.target.value })}
                                required
                                style={styles.inputField}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Câu trả lời của Chatbot:</label>
                            <textarea
                                placeholder="Nhập câu trả lời chi tiết..."
                                value={form.cauTraLoi}
                                onChange={e => setForm({ ...form, cauTraLoi: e.target.value })}
                                required
                                rows="4"
                                style={styles.textareaField}
                            />
                        </div>

                        <div>
                            <label style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={form.trangThai}
                                    onChange={e => setForm({ ...form, trangThai: e.target.checked })}
                                    style={{ width: "16px", height: "16px", cursor: "pointer" }}
                                /> 
                                <span style={{ fontWeight: "600", color: "#334155" }}>Hoạt động</span>
                            </label>
                        </div>

                        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                            <button type="submit" style={styles.btnSave}>Lưu</button>
                            <button type="button" onClick={() => setShowForm(false)} style={styles.btnCancel}>Hủy</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Bảng dữ liệu FAQ */}
            <div style={styles.card}>
                <div style={{ overflowX: "auto" }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ ...styles.th, width: "70px" }}>ID</th>
                                <th style={{ ...styles.th, width: "30%" }}>Câu hỏi</th>
                                <th style={{ ...styles.th, width: "35%" }}>Câu trả lời</th>
                                <th style={{ ...styles.th, width: "150px" }}>Trạng thái</th>
                                <th style={{ ...styles.th, width: "160px", textAlign: "center" }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faqs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ ...styles.td, textAlign: "center", color: "#94a3b8", padding: "2rem" }}>
                                        Chưa có câu hỏi FAQ nào trong hệ thống.
                                    </td>
                                </tr>
                            ) : (
                                faqs.map(item => (
                                    <tr key={item.faqid || item.faqID} style={styles.tr}>
                                        <td style={{ ...styles.td, fontWeight: "600", color: "#64748b" }}>
                                            {item.faqid || item.faqID}
                                        </td>
                                        <td style={{ ...styles.td, fontWeight: "600", color: "#0f172a" }}>
                                            {item.cauHoi}
                                        </td>
                                        <td style={{ ...styles.td, color: "#475569" }}>
                                            {item.cauTraLoi}
                                        </td>
                                        <td style={styles.td}>
                                            <span style={item.trangThai ? styles.statusActive : styles.statusInactive}>
                                                ● {item.trangThai ? "Hoạt động" : "Vô hiệu"}
                                            </span>
                                        </td>
                                        <td style={{ ...styles.td, textAlign: "center" }}>
                                            <div style={{ display: "flex", gap: "6px", justifyContent: "center", alignItems: "center" }}>
                                                <button onClick={() => handleEdit(item)} style={styles.btnEdit}>Sửa</button>
                                                <button onClick={() => handleDelete(item.faqid || item.faqID)} style={styles.btnDelete}>Xóa</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// Hệ thống CSS thiết kế đồng bộ với giao diện Admin Nesty
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
    },
    pageHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
    },
    title: {
        fontSize: "1.5rem",
        fontWeight: "700",
        color: "#0f172a",
        margin: 0,
    },
    subtitle: {
        fontSize: "0.875rem",
        color: "#64748b",
        margin: "4px 0 0 0",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)",
        border: "1px solid #e2e8f0",
    },
    btnAdd: {
        padding: "0.65rem 1.25rem",
        backgroundColor: "#16a34a",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "0.9rem",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(22, 163, 74, 0.2)",
    },
    formCard: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        border: "1px solid #cbd5e1",
        maxWidth: "600px",
    },
    formTitle: {
        fontSize: "1.1rem",
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: "1rem",
        marginTop: 0,
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    label: {
        fontSize: "0.85rem",
        fontWeight: "600",
        color: "#475569",
    },
    inputField: {
        padding: "0.6rem 0.8rem",
        borderRadius: "8px",
        border: "1px solid #cbd5e1",
        outline: "none",
        fontSize: "0.9rem",
        backgroundColor: "#fff",
        color: "#1e293b",
        width: "100%",
        boxSizing: "border-box",
    },
    textareaField: {
        padding: "0.6rem 0.8rem",
        borderRadius: "8px",
        border: "1px solid #cbd5e1",
        outline: "none",
        fontSize: "0.9rem",
        fontFamily: "inherit",
        backgroundColor: "#fff",
        color: "#1e293b",
        width: "100%",
        boxSizing: "border-box",
    },
    checkboxLabel: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        userSelect: "none",
    },
    btnSave: {
        padding: "0.6rem 1.25rem",
        backgroundColor: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "0.9rem",
        cursor: "pointer",
    },
    btnCancel: {
        padding: "0.6rem 1.25rem",
        backgroundColor: "#e2e8f0",
        color: "#334155",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "0.9rem",
        cursor: "pointer",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "left",
        tableLayout: "fixed",
    },
    th: {
        padding: "0.85rem 1rem",
        backgroundColor: "#f8fafc",
        color: "#475569",
        fontSize: "0.8rem",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        borderBottom: "1px solid #e2e8f0",
        whiteSpace: "nowrap",
    },
    tr: {
        borderBottom: "1px solid #f1f5f9",
    },
    td: {
        padding: "1rem",
        fontSize: "0.9rem",
        verticalAlign: "middle",
        wordBreak: "break-word",
    },
    statusActive: {
        backgroundColor: "#dcfce7",
        color: "#15803d",
        padding: "0.3rem 0.75rem",
        borderRadius: "20px",
        fontSize: "0.78rem",
        fontWeight: "600",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        whiteSpace: "nowrap",
    },
    statusInactive: {
        backgroundColor: "#fee2e2",
        color: "#b91c1c",
        padding: "0.3rem 0.75rem",
        borderRadius: "20px",
        fontSize: "0.78rem",
        fontWeight: "600",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        whiteSpace: "nowrap",
    },
    btnEdit: {
        padding: "0.35rem 0.7rem",
        backgroundColor: "#eff6ff",
        color: "#2563eb",
        border: "1px solid #bfdbfe",
        borderRadius: "6px",
        fontWeight: "600",
        fontSize: "0.78rem",
        cursor: "pointer",
    },
    btnDelete: {
        padding: "0.35rem 0.7rem",
        backgroundColor: "#fef2f2",
        color: "#dc2626",
        border: "1px solid #fecaca",
        borderRadius: "6px",
        fontWeight: "600",
        fontSize: "0.78rem",
        cursor: "pointer",
    },
};