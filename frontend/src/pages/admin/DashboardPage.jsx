import React, { useState, useEffect } from "react";
import { getTongQuanThongKe } from "../../api/thongKeApi";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        tongDoanhThu: 0,
        tongDonHang: 0,
        soSanPhamSapHetHang: 0,
        tongKhachHang: 0
    });

    useEffect(() => {
        const loadStats = async () => {
            try {
                const res = await getTongQuanThongKe();
                setStats(res.data);
            } catch (error) {
                console.error("Lỗi lấy thống kê", error);
            }
        };
        loadStats();
    }, []);

    const cardStyle = {
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        flex: "1",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        color: "#333" // Ép màu chữ mặc định trong thẻ div thành xám đậm
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Báo cáo tổng quan hệ thống</h2>
            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                <div style={cardStyle}>
                    <h3>Tổng doanh thu</h3>
                    <h2 style={{ color: "green" }}>{stats.tongDoanhThu.toLocaleString()} đ</h2>
                </div>
                <div style={cardStyle}>
                    <h3>Tổng đơn hàng</h3>
                    {/* Ép thẳng màu xám đậm vào số để không bị global CSS đè thành màu trắng */}
                    <h2 style={{ color: "#333" }}>{stats.tongDonHang}</h2>
                </div>
                <div style={cardStyle}>
                    <h3>Sản phẩm sắp hết hàng</h3>
                    <h2 style={{ color: "red" }}>{stats.soSanPhamSapHetHang}</h2>
                </div>
                <div style={cardStyle}>
                    <h3>Khách hàng</h3>
                    {/* Ép thẳng màu xám đậm vào số để không bị global CSS đè thành màu trắng */}
                    <h2 style={{ color: "#333" }}>{stats.tongKhachHang}</h2>
                </div>
            </div>
        </div>
    );
}