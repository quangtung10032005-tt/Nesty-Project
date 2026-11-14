import { useEffect, useState } from "react";
import { getAdminOrders, updateOrderStatus } from "../../services/adminService";
import { useNavigate } from "react-router-dom";

export default function OrderManagementPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadOrders = async () => {
        try {
            const data = await getAdminOrders();
            setOrders(data);
        } catch (error) {
            console.error("Lỗi tải đơn hàng:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        if (window.confirm(`Xác nhận đổi trạng thái thành ${newStatus}?`)) {
            try {
                await updateOrderStatus(id, newStatus);
                loadOrders(); // Tải lại danh sách sau khi update
            } catch (error) {
                alert("Cập nhật thất bại!");
            }
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
                <span style={{ color: "#64748b", fontWeight: "500" }}>Đang tải danh sách đơn hàng...</span>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header tiêu đề trang */}
            <div style={styles.pageHeader}>
                <div>
                    <h2 style={styles.title}>Quản lý đơn hàng</h2>
                    {/* <p style={styles.subtitle}>Theo dõi danh sách đơn hàng, cập nhật trạng thái và xử lý giao dịch</p> */}
                </div>
            </div>

            {/* Bảng dữ liệu đơn hàng */}
            <div style={styles.card}>
                <div style={{ overflowX: "auto" }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ ...styles.th, width: "15%" }}>Mã Đơn</th>
                                <th style={{ ...styles.th, width: "15%" }}>Ngày Đặt</th>
                                <th style={{ ...styles.th, width: "25%" }}>Khách Hàng</th>
                                <th style={{ ...styles.th, width: "18%" }}>Tổng Tiền</th>
                                <th style={{ ...styles.th, width: "17%" }}>Trạng Thái</th>
                                <th style={{ ...styles.th, width: "10%", textAlign: "center" }}>Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ ...styles.td, textAlign: "center", color: "#94a3b8", padding: "2rem" }}>
                                        Chưa có đơn hàng nào trong hệ thống.
                                    </td>
                                </tr>
                            ) : (
                                orders.map(order => (
                                    <tr key={order.donHangID} style={styles.tr}>
                                        <td style={{ ...styles.td, fontWeight: "600", color: "#0284c7" }}>
                                            {order.maDonHang}
                                        </td>
                                        <td style={{ ...styles.td, color: "#475569" }}>
                                            {new Date(order.ngayDat).toLocaleDateString("vi-VN")}
                                        </td>
                                        <td style={{ ...styles.td, fontWeight: "600", color: "#0f172a" }}>
                                            {order.hoTenNguoiNhan}
                                        </td>
                                        <td style={{ ...styles.td, fontWeight: "600", color: "#16a34a" }}>
                                            {order.tongTien.toLocaleString("vi-VN")}đ
                                        </td>
                                        <td style={styles.td}>
                                            <select
                                                style={styles.selectField}
                                                value={order.trangThaiDonHang}
                                                onChange={(e) => handleStatusChange(order.donHangID, e.target.value)}
                                            >
                                                <option value="ChoXacNhan">Chờ xác nhận</option>
                                                <option value="DaXacNhan">Đã xác nhận</option>
                                                <option value="DangXuLy">Đang xử lý</option>
                                                <option value="DangGiao">Đang giao</option>
                                                <option value="DaGiao">Đã giao</option>
                                                <option value="DaHuy">Đã hủy</option>
                                            </select>
                                        </td>
                                        <td style={{ ...styles.td, textAlign: "center" }}>
                                            <button
                                                style={styles.btnDetail}
                                                onClick={() => navigate(`/admin/don-hang/${order.donHangID}`)}
                                            >
                                                Chi tiết
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
    selectField: {
        padding: "0.4rem 0.6rem",
        borderRadius: "6px",
        border: "1px solid #cbd5e1",
        outline: "none",
        fontSize: "0.85rem",
        backgroundColor: "#fff",
        color: "#1e293b",
        cursor: "pointer",
        fontWeight: "500",
    },
    btnDetail: {
        padding: "0.35rem 0.7rem",
        backgroundColor: "#eff6ff",
        color: "#2563eb",
        border: "1px solid #bfdbfe",
        borderRadius: "6px",
        fontWeight: "600",
        fontSize: "0.78rem",
        cursor: "pointer",
        whiteSpace: "nowrap",
    },
};