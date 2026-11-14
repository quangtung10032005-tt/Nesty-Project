import React, { useState, useEffect } from "react";
import { getDanhMucs, createDanhMuc, updateDanhMuc, deleteDanhMuc } from "../../api/danhMucApi";

export default function DanhMucPage() {
    const [danhMucs, setDanhMucs] = useState([]);
    const [form, setForm] = useState({ tenDanhMuc: "", moTa: "" });
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await getDanhMucs();
            setDanhMucs(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateDanhMuc(editingId, form);
            } else {
                await createDanhMuc(form);
            }
            await loadData();
            setShowForm(false);
            setEditingId(null);
            setForm({ tenDanhMuc: "", moTa: "" });
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (item) => {
        setForm({ tenDanhMuc: item.tenDanhMuc, moTa: item.moTa || "" });
        setEditingId(item.danhMucID);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Xác nhận vô hiệu hóa danh mục này?")) return;
        try {
            await deleteDanhMuc(id);
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
                    <h2 style={styles.title}>Quản lý danh mục</h2>
                    {/* <p style={styles.subtitle}>Quản lý danh mục sản phẩm và trạng thái hoạt động trong hệ thống</p> */}
                </div>
                <button 
                    onClick={() => { setShowForm(true); setEditingId(null); setForm({ tenDanhMuc: "", moTa: "" }); }}
                    style={styles.btnAdd}
                >
                    + Thêm danh mục
                </button>
            </div>

            {/* Form Thêm / Sửa dạng Card */}
            {showForm && (
                <div style={styles.formCard}>
                    <h3 style={styles.formTitle}>{editingId ? "Cập nhật danh mục" : "Thêm danh mục mới"}</h3>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Tên danh mục:</label>
                            <input
                                placeholder="Nhập tên danh mục..."
                                value={form.tenDanhMuc}
                                onChange={e => setForm({ ...form, tenDanhMuc: e.target.value })}
                                required
                                style={styles.inputField}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Mô tả:</label>
                            <input
                                placeholder="Nhập mô tả danh mục..."
                                value={form.moTa}
                                onChange={e => setForm({ ...form, moTa: e.target.value })}
                                style={styles.inputField}
                            />
                        </div>

                        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                            <button type="submit" style={styles.btnSave}>Lưu</button>
                            <button type="button" onClick={() => setShowForm(false)} style={styles.btnCancel}>Hủy</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Bảng dữ liệu danh mục */}
            <div style={styles.card}>
                <div style={{ overflowX: "auto" }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ ...styles.th, width: "80px" }}>ID</th>
                                <th style={{ ...styles.th, width: "35%" }}>Tên danh mục</th>
                                <th style={{ ...styles.th, width: "180px" }}>Trạng thái</th>
                                <th style={{ ...styles.th, width: "180px", textAlign: "center" }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {danhMucs.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={{ ...styles.td, textAlign: "center", color: "#94a3b8", padding: "2rem" }}>
                                        Chưa có danh mục nào trong hệ thống.
                                    </td>
                                </tr>
                            ) : (
                                danhMucs.map(item => (
                                    <tr key={item.danhMucID} style={styles.tr}>
                                        <td style={{ ...styles.td, fontWeight: "600", color: "#64748b" }}>
                                            {item.danhMucID}
                                        </td>
                                        <td style={{ ...styles.td, fontWeight: "600", color: "#0f172a" }}>
                                            {item.tenDanhMuc}
                                        </td>
                                        <td style={styles.td}>
                                            <span style={item.trangThai ? styles.statusActive : styles.statusInactive}>
                                                ● {item.trangThai ? "Hoạt động" : "Vô hiệu"}
                                            </span>
                                        </td>
                                        <td style={{ ...styles.td, textAlign: "center" }}>
                                            <div style={{ display: "flex", gap: "6px", justifyContent: "center", alignItems: "center" }}>
                                                <button onClick={() => handleEdit(item)} style={styles.btnEdit}>Sửa</button>
                                                <button onClick={() => handleDelete(item.danhMucID)} style={styles.btnDelete}>Vô hiệu</button>
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