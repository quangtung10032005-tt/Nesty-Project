import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSanPhams, createSanPham, updateSanPham, deleteSanPham } from "../../api/sanPhamApi";
import { getDanhMucs } from "../../api/danhMucApi";

export default function SanPhamPage() {
    const navigate = useNavigate();
    const [sanPhams, setSanPhams] = useState([]);
    const [danhMucs, setDanhMucs] = useState([]);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        tenSanPham: "",
        danhMucID: "",
        thuongHieu: "",
        moTa: ""
    });

    useEffect(() => {
        loadSanPhams();
        loadDanhMucs();
    }, []);

    const loadSanPhams = async () => {
        try {
            const response = await getSanPhams(search);
            setSanPhams(response.data);
        } catch (error) {
            console.error("Lỗi load sản phẩm:", error);
        }
    };

    const loadDanhMucs = async () => {
        try {
            const response = await getDanhMucs();
            setDanhMucs(response.data);
        } catch (error) {
            console.error("Lỗi load danh mục:", error);
        }
    };

    const handleOpenAdd = () => {
        setEditingId(null);
        setFormData({ tenSanPham: "", danhMucID: "", thuongHieu: "", moTa: "" });
        setShowForm(true);
    };

    const handleOpenEdit = (item) => {
        setEditingId(item.sanPhamID);
        setFormData({
            tenSanPham: item.tenSanPham,
            danhMucID: item.danhMucID,
            thuongHieu: item.thuongHieu,
            moTa: item.moTa
        });
        setShowForm(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateSanPham(editingId, formData);
            } else {
                await createSanPham(formData);
            }
            setShowForm(false);
            loadSanPhams();
        } catch (error) {
            console.error("Lỗi lưu sản phẩm:", error);
        }
    };

    const handleToggleStatus = async (item) => {
        const actionText = item.trangThai ? "vô hiệu hóa" : "kích hoạt lại";
        if (window.confirm(`Bạn có chắc muốn ${actionText} sản phẩm này?`)) {
            try {
                await deleteSanPham(item.sanPhamID);
                loadSanPhams();
            } catch (error) {
                console.error("Lỗi thay đổi trạng thái:", error);
            }
        }
    };

    return (
        <div style={styles.container}>
            {/* Header tiêu đề trang */}
            <div style={styles.pageHeader}>
                <div>
                    <h2 style={styles.title}>Quản lý Sản phẩm</h2>
                    {/* <p style={styles.subtitle}>Quản lý danh mục, thông tin và trạng thái sản phẩm trong hệ thống</p> */}
                </div>
            </div>

            {/* Thanh công cụ: Tìm kiếm & Thêm mới */}
            <div style={styles.card}>
                <div style={styles.toolbar}>
                    <div style={styles.searchBox}>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Tìm theo tên sản phẩm..."
                            style={styles.searchInput}
                        />
                        <button onClick={() => loadSanPhams()} style={styles.btnSearch}>Tìm kiếm</button>
                    </div>
                    <button onClick={handleOpenAdd} style={styles.btnAdd}>
                        + Thêm sản phẩm
                    </button>
                </div>
            </div>

            {/* Modal / Form Thêm & Sửa */}
            {showForm && (
                <div style={styles.formCard}>
                    <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <h3 style={styles.formTitle}>{editingId ? "Sửa thông tin sản phẩm" : "Thêm sản phẩm mới"}</h3>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Tên sản phẩm:</label>
                            <input
                                required
                                value={formData.tenSanPham}
                                onChange={e => setFormData({ ...formData, tenSanPham: e.target.value })}
                                style={styles.inputField}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Danh mục:</label>
                            <select
                                required
                                value={formData.danhMucID}
                                onChange={e => setFormData({ ...formData, danhMucID: e.target.value })}
                                style={styles.inputField}
                            >
                                <option value="">-- Chọn danh mục --</option>
                                {danhMucs.map(dm => (
                                    <option key={dm.danhMucID} value={dm.danhMucID}>{dm.tenDanhMuc}</option>
                                ))}
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Thương hiệu:</label>
                            <input
                                value={formData.thuongHieu}
                                onChange={e => setFormData({ ...formData, thuongHieu: e.target.value })}
                                style={styles.inputField}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Mô tả:</label>
                            <textarea
                                rows="3"
                                value={formData.moTa}
                                onChange={e => setFormData({ ...formData, moTa: e.target.value })}
                                style={styles.textareaField}
                            ></textarea>
                        </div>

                        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                            <button type="submit" style={styles.btnSave}>Lưu</button>
                            <button type="button" onClick={() => setShowForm(false)} style={styles.btnCancel}>Hủy bỏ</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Bảng dữ liệu sản phẩm */}
            <div style={styles.card}>
                <div style={{ overflowX: "auto" }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ ...styles.th, width: "60px" }}>ID</th>
                                <th style={{ ...styles.th, width: "35%" }}>Tên sản phẩm</th>
                                <th style={{ ...styles.th, width: "150px" }}>Thương hiệu</th>
                                <th style={{ ...styles.th, width: "170px" }}>Trạng thái</th>
                                <th style={{ ...styles.th, textAlign: "center" }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sanPhams.map((item) => (
                                <tr key={item.sanPhamID} style={styles.tr}>
                                    <td style={{ ...styles.td, fontWeight: "600", color: "#4c5663" }}>{item.sanPhamID}</td>
                                    <td style={{ ...styles.td, fontWeight: "500", color: "#0f172a" }}>{item.tenSanPham}</td>
                                    <td style={styles.td}>
                                        <span style={styles.brandBadge}>{item.thuongHieu || "Nesty"}</span>
                                    </td>
                                    <td style={styles.td}>
                                        <span style={item.trangThai ? styles.statusActive : styles.statusInactive}>
                                            ● {item.trangThai ? "Hoạt động" : "Ngừng hoạt động"}
                                        </span>
                                    </td>
                                    <td style={{ ...styles.td, textAlign: "center" }}>
                                        <div style={{ display: "flex", gap: "6px", justifyContent: "center", alignItems: "center" }}>
                                            <button onClick={() => handleOpenEdit(item)} style={styles.btnEdit}>Sửa</button>
                                            <button onClick={() => navigate(`/admin/products/${item.sanPhamID}`)} style={styles.btnManage}>Quản lý</button>
                                            
                                            {item.trangThai ? (
                                                <button onClick={() => handleToggleStatus(item)} style={styles.btnDisable}>
                                                    Vô hiệu hóa
                                                </button>
                                            ) : (
                                                <button onClick={() => handleToggleStatus(item)} style={styles.btnEnable}>
                                                    Kích hoạt
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

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
        padding: "1.25rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)",
        border: "1px solid #e2e8f0",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
    },
    searchBox: {
        display: "flex",
        gap: "8px",
        flex: 1,
        maxWidth: "450px",
    },
    searchInput: {
        flex: 1,
        padding: "0.6rem 1rem",
        borderRadius: "8px",
        border: "1px solid #cbd5e1",
        outline: "none",
        fontSize: "0.9rem",
        color: "#1e293b",
    },
    btnSearch: {
        padding: "0.6rem 1.25rem",
        backgroundColor: "#f1f5f9",
        color: "#334155",
        border: "1px solid #cbd5e1",
        borderRadius: "8px",
        fontWeight: "600",
        cursor: "pointer",
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
        maxWidth: "500px",
    },
    formTitle: {
        fontSize: "1.1rem",
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: "0.5rem",
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
    },
    textareaField: {
        padding: "0.6rem 0.8rem",
        borderRadius: "8px",
        border: "1px solid #cbd5e1",
        outline: "none",
        fontSize: "0.9rem",
        fontFamily: "inherit",
    },
    btnSave: {
        padding: "0.6rem 1.25rem",
        backgroundColor: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
        cursor: "pointer",
    },
    btnCancel: {
        padding: "0.6rem 1.25rem",
        backgroundColor: "#e2e8f0",
        color: "#334155",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
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
        color: "#09326b",
        fontSize: "0.8rem",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        borderBottom: "1px solid #e2e8f0",
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
    brandBadge: {
        backgroundColor: "#eff6ff",
        color: "#1d4ed8",
        padding: "0.25rem 0.6rem",
        borderRadius: "6px",
        fontSize: "0.8rem",
        fontWeight: "600",
        border: "1px solid #e2e8f0",
        display: "inline-block",
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
        whiteSpace: "nowrap", // Giữ nguyên dòng không bị rớt chữ
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
        whiteSpace: "nowrap", // Giữ nguyên dòng không bị rớt chữ
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
    btnManage: {
        padding: "0.35rem 0.7rem",
        backgroundColor: "#f8fafc",
        color: "#475569",
        border: "1px solid #cbd5e1",
        borderRadius: "6px",
        fontWeight: "600",
        fontSize: "0.78rem",
        cursor: "pointer",
    },
    btnDisable: {
        padding: "0.35rem 0.7rem",
        backgroundColor: "#fef2f2",
        color: "#dc2626",
        border: "1px solid #fecaca",
        borderRadius: "6px",
        fontWeight: "600",
        fontSize: "0.78rem",
        cursor: "pointer",
    },
    btnEnable: {
        padding: "0.35rem 0.7rem",
        backgroundColor: "#f0fdf4",
        color: "#16a34a",
        border: "1px solid #bbf7d0",
        borderRadius: "6px",
        fontWeight: "600",
        fontSize: "0.78rem",
        cursor: "pointer",
    },
};