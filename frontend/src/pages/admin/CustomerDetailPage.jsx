import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAdminCustomerDetail } from "../../services/adminService";

export default function CustomerDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getAdminCustomerDetail(id);
                setCustomer(data);
            } catch (error) {
                console.error("Lỗi tải chi tiết KH:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
                <span style={{ color: "#64748b", fontWeight: "500" }}>Đang tải hồ sơ khách hàng...</span>
            </div>
        );
    }

    if (!customer) {
        return (
            <div style={{ padding: "2rem", textAlign: "center", color: "#64748b", fontWeight: "500" }}>
                Không tìm thấy khách hàng.
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Nút Quay lại */}
            <div>
                <button onClick={() => navigate(-1)} style={styles.btnBack}>
                    <i className="fa-solid fa-arrow-left" style={{ marginRight: "8px" }}></i>
                    Quay lại danh sách
                </button>
            </div>

            {/* Header tiêu đề trang */}
            <div style={styles.pageHeader}>
                <div>
                    <h2 style={styles.title}>Hồ sơ khách hàng: {customer.hoTen}</h2>
                    {/* <p style={styles.subtitle}>Xem thông tin chi tiết cá nhân và lịch sử giao dịch của khách hàng</p> */}
                </div>
            </div>

            {/* Thông tin chi tiết cá nhân */}
            <div style={styles.card}>
                <h3 style={styles.sectionTitle}>Thông tin chung</h3>
                <div style={styles.infoGrid}>
                    <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>Email:</span>
                        <span style={styles.infoValue}>{customer.email || "Chưa cập nhật"}</span>
                    </div>
                    <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>Số điện thoại:</span>
                        <span style={styles.infoValue}>{customer.soDienThoai || "Chưa cập nhật"}</span>
                    </div>
                    <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>Giới tính:</span>
                        <span style={styles.infoValue}>{customer.gioiTinh || "Chưa cập nhật"}</span>
                    </div>
                    <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>Ngày sinh:</span>
                        <span style={styles.infoValue}>{customer.ngaySinh ? new Date(customer.ngaySinh).toLocaleDateString("vi-VN") : "Chưa cập nhật"}</span>
                    </div>
                    <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>Ngày tham gia:</span>
                        <span style={styles.infoValue}>{customer.ngayTao ? new Date(customer.ngayTao).toLocaleDateString("vi-VN") : "N/A"}</span>
                    </div>
                </div>
            </div>

            {/* Lịch sử mua hàng */}
            <div style={styles.card}>
                <div style={styles.sectionHeader}>
                    <h3 style={styles.sectionTitle}>Lịch sử mua hàng ({customer.lichSuDonHang.length} đơn)</h3>
                </div>

                <div style={{ overflowX: "auto" }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ ...styles.th, width: "20%" }}>Mã Đơn</th>
                                <th style={{ ...styles.th, width: "20%" }}>Ngày Đặt</th>
                                <th style={{ ...styles.th, width: "22%" }}>Tổng Tiền</th>
                                <th style={{ ...styles.th, width: "23%" }}>Trạng Thái</th>
                                <th style={{ ...styles.th, width: "15%", textAlign: "center" }}>Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.lichSuDonHang.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ ...styles.td, textAlign: "center", color: "#94a3b8", padding: "2rem" }}>
                                        Khách hàng này chưa mua đơn nào.
                                    </td>
                                </tr>
                            ) : (
                                customer.lichSuDonHang.map(order => (
                                    <tr key={order.donHangID} style={styles.tr}>
                                        <td style={{ ...styles.td, fontWeight: "600", color: "#0284c7" }}>
                                            {order.maDonHang}
                                        </td>
                                        <td style={{ ...styles.td, color: "#475569" }}>
                                            {new Date(order.ngayDat).toLocaleDateString("vi-VN")}
                                        </td>
                                        <td style={{ ...styles.td, fontWeight: "600", color: "#16a34a" }}>
                                            {order.tongTien.toLocaleString("vi-VN")}đ
                                        </td>
                                        <td style={styles.td}>
                                            <span style={styles.statusBadge}>
                                                {order.trangThaiDonHang}
                                            </span>
                                        </td>
                                        <td style={{ ...styles.td, textAlign: "center" }}>
                                            <button
                                                style={styles.btnDetail}
                                                onClick={() => navigate(`/admin/don-hang/${order.donHangID}`)}
                                            >
                                                Xem Đơn
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
    sectionHeader: {
        marginBottom: "1rem",
    },
    sectionTitle: {
        fontSize: "1.15rem",
        fontWeight: "700",
        color: "#0f172a",
        margin: "0 0 1rem 0",
    },
    infoGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1rem",
    },
    infoItem: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        backgroundColor: "#f8fafc",
        padding: "0.85rem 1rem",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
    },
    infoLabel: {
        fontSize: "0.8rem",
        fontWeight: "600",
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
    },
    infoValue: {
        fontSize: "0.95rem",
        fontWeight: "600",
        color: "#0f172a",
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
    statusBadge: {
        backgroundColor: "#fef2f2",
        color: "#dc2626",
        padding: "0.3rem 0.75rem",
        borderRadius: "20px",
        fontSize: "0.78rem",
        fontWeight: "700",
        display: "inline-block",
        border: "1px solid #fecaca",
        whiteSpace: "nowrap",
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
    btnBack: {
        padding: "0.55rem 1rem",
        backgroundColor: "#ffffff",
        color: "#475569",
        border: "1px solid #cbd5e1",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "0.85rem",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
        transition: "all 0.2s ease",
    },
};