import { useEffect, useState } from "react";
import { getAdminCustomers } from "../../services/adminService";
import { useNavigate } from "react-router-dom";

export default function CustomerManagementPage() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getAdminCustomers();
                setCustomers(data);
            } catch (error) {
                console.error("Lỗi tải danh sách KH:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
                <span style={{ color: "#64748b", fontWeight: "500" }}>Đang tải danh sách khách hàng...</span>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header tiêu đề trang */}
            <div style={styles.pageHeader}>
                <div>
                    <h2 style={styles.title}>Quản lý khách hàng</h2>
                    {/* <p style={styles.subtitle}>Theo dõi danh sách khách hàng, thông tin liên hệ và lịch sử đơn hàng</p> */}
                </div>
            </div>

            {/* Bảng dữ liệu khách hàng */}
            <div style={styles.card}>
                <div style={{ overflowX: "auto" }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ ...styles.th, width: "80px" }}>ID</th>
                                <th style={{ ...styles.th, width: "22%" }}>Họ Tên</th>
                                <th style={{ ...styles.th, width: "18%" }}>SĐT</th>
                                <th style={{ ...styles.th, width: "25%" }}>Email</th>
                                <th style={{ ...styles.th, width: "15%" }}>Ngày Tham Gia</th>
                                <th style={{ ...styles.th, width: "110px", textAlign: "center" }}>Số Đơn Hàng</th>
                                <th style={{ ...styles.th, width: "120px", textAlign: "center" }}>Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length === 0 ? (
                                <tr>
                                    <td colSpan="7" style={{ ...styles.td, textAlign: "center", color: "#94a3b8", padding: "2rem" }}>
                                        Chưa có khách hàng nào trong hệ thống.
                                    </td>
                                </tr>
                            ) : (
                                customers.map(c => (
                                    <tr key={c.khachHangID} style={styles.tr}>
                                        <td style={{ ...styles.td, fontWeight: "600", color: "#64748b" }}>
                                            {c.khachHangID}
                                        </td>
                                        <td style={{ ...styles.td, fontWeight: "600", color: "#0f172a" }}>
                                            {c.hoTen}
                                        </td>
                                        <td style={{ ...styles.td, color: "#475569" }}>
                                            {c.soDienThoai}
                                        </td>
                                        <td style={{ ...styles.td, color: "#475569" }}>
                                            {c.email}
                                        </td>
                                        <td style={{ ...styles.td, color: "#475569" }}>
                                            {c.ngayTao ? new Date(c.ngayTao).toLocaleDateString("vi-VN") : 'N/A'}
                                        </td>
                                        <td style={{ ...styles.td, textAlign: "center" }}>
                                            <span style={styles.orderBadge}>
                                                {c.soLuongDonHang} đơn
                                            </span>
                                        </td>
                                        <td style={{ ...styles.td, textAlign: "center" }}>
                                            <button
                                                style={styles.btnProfile}
                                                onClick={() => navigate(`/admin/khach-hang/${c.khachHangID}`)}
                                            >
                                                Hồ sơ
                                            </button>
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
    loadingContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "300px",
        gap: "10px",
    },
    spinner: {
        width: "36px",
        height: "36px",
        border: "3px solid #e2e8f0",
        borderTop: "3px solid #2563eb",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
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
    orderBadge: {
        backgroundColor: "#f0fdf4",
        color: "#15803d",
        padding: "0.3rem 0.75rem",
        borderRadius: "20px",
        fontSize: "0.82rem",
        fontWeight: "700",
        display: "inline-block",
        border: "1px solid #bbf7d0",
        whiteSpace: "nowrap",
    },
    btnProfile: {
        padding: "0.35rem 0.7rem",
        backgroundColor: "#f0fdf4",
        color: "#16a34a",
        border: "1px solid #bbf7d0",
        borderRadius: "6px",
        fontWeight: "600",
        fontSize: "0.78rem",
        cursor: "pointer",
        whiteSpace: "nowrap",
    },
};