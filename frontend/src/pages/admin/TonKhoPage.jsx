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
        <div style={{ padding: "20px" }}>
            <h2>Quản lý tồn kho biến thể</h2>
            <button
                onClick={() => navigate("/admin/nhap-kho")}
                style={{ marginBottom: "20px", padding: "5px 10px", cursor: "pointer" }}
            >
                + Tạo phiếu nhập kho
            </button>

            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Tồn kho ID</th>
                        <th>Kho</th>
                        <th>Sản phẩm</th>
                        <th>Phân loại</th>
                        <th>Số lượng tồn</th>
                        <th>Cập nhật cuối</th>
                    </tr>
                </thead>
                <tbody>
                    {tonKhos.length === 0 ? (
                        <tr><td colSpan="6" style={{ textAlign: "center" }}>Chưa có dữ liệu tồn kho</td></tr>
                    ) : (
                        tonKhos.map(item => (
                            <tr key={item.tonKhoID}>
                                <td>{item.tonKhoID}</td>
                                <td>{item.tenKho}</td>
                                <td>{item.tenSanPham}</td>
                                <td>{item.kichThuoc} - {item.mauSac}</td>
                                <td>
                                    <strong style={{ color: item.soLuongTon < 10 ? "red" : "black" }}>
                                        {item.soLuongTon}
                                    </strong>
                                </td>
                                <td>{item.ngayCapNhat ? new Date(item.ngayCapNhat).toLocaleString("vi-VN") : "Chưa cập nhật"}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}