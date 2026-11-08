import React, { useState, useEffect } from "react";
import { getTonKho } from "../../api/khoApi"; 
import { useNavigate } from "react-router-dom";

export default function TonKhoPage() {
    const [tonKhos, setTonKhos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await getTonKho();
            setTonKhos(res.data);
        } catch (error) {
            console.error("Lỗi khi tải tồn kho:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div style={{ padding: "20px" }}>Đang tải dữ liệu tồn kho...</div>;

    return (
        <div style={styles.container}>
            {/* Header tiêu đề trang */}
            <div style={styles.pageHeader}>
                <div>
                    <h2 style={styles.title}>Quản lý tồn kho biến thể</h2>
                    {/* <p style={styles.subtitle}>Theo dõi số lượng hàng tồn, kho lưu trữ và trạng thái sản phẩm</p> */}
                </div>
                <button
                    onClick={() => navigate("/admin/nhap-kho")}
                    style={styles.btnAdd}
                >
                    + Tạo phiếu nhập kho
                </button>
            </div>

            {/* Bảng dữ liệu tồn kho */}
            <div style={styles.card}>
                <div style={{ overflowX: "auto" }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ ...styles.th, width: "12%" }}>Tồn kho ID</th>
                                <th style={{ ...styles.th, width: "15%" }}>Kho</th>
                                <th style={{ ...styles.th, width: "25%" }}>Sản phẩm</th>
                                <th style={{ ...styles.th, width: "18%" }}>Phân loại</th>
                                <th style={{ ...styles.th, width: "15%", textAlign: "center" }}>Số lượng tồn</th>
                                <th style={{ ...styles.th, width: "15%" }}>Cập nhật cuối</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tonKhos.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ ...styles.td, textAlign: "center", color: "#94a3b8", padding: "2rem" }}>
                                        Chưa có dữ liệu tồn kho
                                    </td>
                                </tr>
                            ) : (
                                tonKhos.map(item => {
                                    const isLowStock = item.soLuongTon < 10;
                                    return (
                                        <tr key={item.tonKhoID} style={styles.tr}>
                                            <td style={{ ...styles.td, fontWeight: "600", color: "#64748b" }}>{item.tonKhoID}</td>
                                            <td style={{ ...styles.td, fontWeight: "500", color: "#334155" }}>{item.tenKho}</td>
                                            <td style={{ ...styles.td, fontWeight: "600", color: "#0f172a" }}>{item.tenSanPham}</td>
                                            <td style={styles.td}>
                                                <div style={{ display: "flex", gap: "6px" }}>
                                                    {item.kichThuoc && <span style={styles.badgeAttr}>{item.kichThuoc}</span>}
                                                    {item.mauSac && <span style={styles.badgeAttr}>{item.mauSac}</span>}
                                                </div>
                                            </td>
                                            <td style={{ ...styles.td, textAlign: "center" }}>
                                                <span style={isLowStock ? styles.statusLowStock : styles.statusNormal}>
                                                    {item.soLuongTon}
                                                </span>
                                            </td>
                                            <td style={{ ...styles.td, color: "#475569", fontSize: "0.85rem" }}>
                                                {item.ngayCapNhat ? new Date(item.ngayCapNhat).toLocaleString("vi-VN") : "Chưa cập nhật"}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
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
    table: {
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "left",
        tableLayout: "fixed", // Cố định cấu trúc để chia đều tỷ lệ phần trăm % các cột
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
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis", // Cắt dấu ... nếu tên quá dài để tránh vỡ giao diện
    },
    badgeAttr: {
        backgroundColor: "#f1f5f9",
        color: "#334155",
        padding: "0.2rem 0.5rem",
        borderRadius: "6px",
        fontSize: "0.78rem",
        fontWeight: "500",
        border: "1px solid #cbd5e1",
        display: "inline-block",
        whiteSpace: "nowrap",
    },
    statusNormal: {
        backgroundColor: "#f0fdf4",
        color: "#15803d",
        padding: "0.3rem 0.75rem",
        borderRadius: "20px",
        fontSize: "0.85rem",
        fontWeight: "600",
        display: "inline-block",
        whiteSpace: "nowrap",
        border: "1px solid #bbf7d0",
    },
    statusLowStock: {
        backgroundColor: "#fef2f2",
        color: "#dc2626",
        padding: "0.3rem 0.75rem",
        borderRadius: "20px",
        fontSize: "0.85rem",
        fontWeight: "600",
        display: "inline-block",
        whiteSpace: "nowrap",
        border: "1px solid #fecaca",
    },
};