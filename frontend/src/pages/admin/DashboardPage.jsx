import React, { useState, useEffect } from "react";
import { getTongQuanThongKe } from "../../api/thongKeApi";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        tongDoanhThu: 0,
        tongDonHang: 0,
        soSanPhamSapHetHang: 0,
        tongKhachHang: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                setLoading(true);
                const res = await getTongQuanThongKe();
                setStats(res.data);
            } catch (error) {
                console.error("Lỗi lấy thống kê hệ thống:", error);
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
                <span style={{ color: "#64748b", fontWeight: "500" }}>Đang tải báo cáo tổng quan...</span>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header tiêu đề trang */}
            <div style={styles.pageHeader}>
                <div>
                    <h2 style={styles.title}>Báo cáo tổng quan hệ thống</h2>
                    {/* <p style={styles.subtitle}>Số liệu thống kê thời gian thực về doanh thu, đơn hàng và kho lưu trữ</p> */}
                </div>
            </div>

            {/* Lưới các thẻ thống kê (KPI Cards) */}
            <div style={styles.gridContainer}>
                {/* Tổng doanh thu */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <span style={styles.cardTitle}>Tổng doanh thu</span>
                        <div style={{ ...styles.iconBox, backgroundColor: "#f0fdf4", color: "#16a34a" }}>
                            <i className="fa-solid fa-sack-dollar"></i>
                        </div>
                    </div>
                    <div style={{ ...styles.cardValue, color: "#16a34a" }}>
                        {stats.tongDoanhThu ? stats.tongDoanhThu.toLocaleString("vi-VN") : 0} <span style={styles.unit}>đ</span>
                    </div>
                </div>

                {/* Tổng đơn hàng */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <span style={styles.cardTitle}>Tổng đơn hàng</span>
                        <div style={{ ...styles.iconBox, backgroundColor: "#eff6ff", color: "#2563eb" }}>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </div>
                    </div>
                    <div style={{ ...styles.cardValue, color: "#0f172a" }}>
                        {stats.tongDonHang?.toLocaleString("vi-VN") || 0}
                    </div>
                </div>

                {/* Sản phẩm sắp hết hàng */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <span style={styles.cardTitle}>Sản phẩm sắp hết hàng</span>
                        <div style={{ ...styles.iconBox, backgroundColor: "#fef2f2", color: "#dc2626" }}>
                            <i className="fa-solid fa-triangle-exclamation"></i>
                        </div>
                    </div>
                    <div style={{ ...styles.cardValue, color: "#dc2626" }}>
                        {stats.soSanPhamSapHetHang?.toLocaleString("vi-VN") || 0}
                    </div>
                </div>

                {/* Khách hàng */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <span style={styles.cardTitle}>Tổng khách hàng</span>
                        <div style={{ ...styles.iconBox, backgroundColor: "#f8fafc", color: "#475569" }}>
                            <i className="fa-solid fa-users"></i>
                        </div>
                    </div>
                    <div style={{ ...styles.cardValue, color: "#0f172a" }}>
                        {stats.tongKhachHang?.toLocaleString("vi-VN") || 0}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Hệ thống CSS chuẩn Enterprise Design System tương thích với Nesty Admin
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
        minHeight: "350px",
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
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "1.25rem",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "1.25rem 1.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)",
        border: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardTitle: {
        fontSize: "0.9rem",
        fontWeight: "600",
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.03em",
    },
    iconBox: {
        width: "36px",
        height: "36px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
    },
    cardValue: {
        fontSize: "1.75rem",
        fontWeight: "700",
        margin: 0,
        lineHeight: "1.2",
    },
    unit: {
        fontSize: "1.1rem",
        fontWeight: "600",
    },
};