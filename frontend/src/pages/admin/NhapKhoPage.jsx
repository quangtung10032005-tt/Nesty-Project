import React, { useState } from "react";
import { createPhieuNhapKho } from "../../api/khoApi"; // Đổi đường dẫn nếu mày lưu api khác
import { useNavigate } from "react-router-dom";

export default function NhapKhoPage() {
    const navigate = useNavigate();
    const [khoID, setKhoID] = useState("");
    const [nhaCungCapID, setNhaCungCapID] = useState("");
    const [ghiChu, setGhiChu] = useState("");
    const [chiTiet, setChiTiet] = useState([]);

    // Form nhập nhanh chi tiết
    const [bienTheID, setBienTheID] = useState("");
    const [soLuong, setSoLuong] = useState("");
    const [donGiaNhap, setDonGiaNhap] = useState("");

    const handleAddRow = () => {
        if (!bienTheID || !soLuong || !donGiaNhap) {
            alert("Vui lòng nhập đủ thông tin biến thể, số lượng và đơn giá!");
            return;
        }

        const newItem = {
            bienTheID: parseInt(bienTheID),
            soLuong: parseInt(soLuong),
            donGiaNhap: parseFloat(donGiaNhap)
        };

        setChiTiet([...chiTiet, newItem]);

        // Reset form nhập chi tiết
        setBienTheID("");
        setSoLuong("");
        setDonGiaNhap("");
    };

    const handleRemoveRow = (indexToRemove) => {
        setChiTiet(chiTiet.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!khoID || !nhaCungCapID) {
            alert("Vui lòng nhập ID Kho và ID Nhà cung cấp!");
            return;
        }

        if (chiTiet.length === 0) {
            alert("Vui lòng thêm ít nhất 1 sản phẩm vào danh sách nhập!");
            return;
        }

        const payload = {
            khoID: parseInt(khoID),
            nhaCungCapID: parseInt(nhaCungCapID),
            ghiChu: ghiChu,
            chiTiet: chiTiet
        };

        try {
            await createPhieuNhapKho(payload);
            alert("Tạo phiếu nhập kho thành công!");
            navigate("/admin/ton-kho");
        } catch (error) {
            console.error("Lỗi nhập kho:", error);
            alert("Lỗi khi tạo phiếu nhập kho. Vui lòng kiểm tra lại dữ liệu.");
        }
    };

    const tongTien = chiTiet.reduce((sum, item) => sum + (item.soLuong * item.donGiaNhap), 0);

    return (
        <div style={styles.container}>
            {/* Header tiêu đề trang */}
            <div style={styles.pageHeader}>
                <div>
                    <h2 style={styles.title}>Tạo phiếu nhập kho</h2>
                    {/* <p style={styles.subtitle}>Nhập thông tin kho, nhà cung cấp và danh sách sản phẩm nhập vào hệ thống</p> */}
                </div>
            </div>

            {/* Form thông tin chung & thêm chi tiết */}
            <div style={styles.card}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>ID Kho:</label>
                            <input 
                                type="number" 
                                placeholder="VD: 3" 
                                value={khoID} 
                                onChange={(e) => setKhoID(e.target.value)} 
                                required 
                                style={styles.inputField} 
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>ID Nhà cung cấp:</label>
                            <input 
                                type="number" 
                                placeholder="VD: 1" 
                                value={nhaCungCapID} 
                                onChange={(e) => setNhaCungCapID(e.target.value)} 
                                required 
                                style={styles.inputField} 
                            />
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Ghi chú phiếu nhập:</label>
                        <textarea 
                            placeholder="Nhập ghi chú (nếu có)..." 
                            value={ghiChu} 
                            onChange={(e) => setGhiChu(e.target.value)} 
                            rows="3" 
                            style={styles.textareaField}
                        />
                    </div>

                    <div style={styles.subCard}>
                        <h4 style={styles.subCardTitle}>Thêm sản phẩm nhập nhanh</h4>
                        <div style={{ display: "flex", gap: "10px", alignItems: "flex-end", flexWrap: "wrap" }}>
                            <div style={{ ...styles.formGroup, flex: "1", minWidth: "130px" }}>
                                <label style={styles.label}>ID Biến thể</label>
                                <input 
                                    type="number" 
                                    placeholder="ID biến thể" 
                                    value={bienTheID} 
                                    onChange={(e) => setBienTheID(e.target.value)} 
                                    style={styles.inputField} 
                                />
                            </div>
                            <div style={{ ...styles.formGroup, flex: "1", minWidth: "120px" }}>
                                <label style={styles.label}>Số lượng</label>
                                <input 
                                    type="number" 
                                    placeholder="Số lượng" 
                                    value={soLuong} 
                                    onChange={(e) => setSoLuong(e.target.value)} 
                                    style={styles.inputField} 
                                />
                            </div>
                            <div style={{ ...styles.formGroup, flex: "1.2", minWidth: "150px" }}>
                                <label style={styles.label}>Đơn giá nhập</label>
                                <input 
                                    type="number" 
                                    placeholder="Đơn giá nhập" 
                                    value={donGiaNhap} 
                                    onChange={(e) => setDonGiaNhap(e.target.value)} 
                                    style={styles.inputField} 
                                />
                            </div>
                            <button type="button" onClick={handleAddRow} style={styles.btnAddRow}>
                                + Thêm
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Bảng danh sách chi tiết sản phẩm nhập */}
            <div style={styles.card}>
                <div style={{ overflowX: "auto" }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ ...styles.th, width: "15%" }}>ID Biến thể</th>
                                <th style={{ ...styles.th, width: "20%" }}>Số lượng</th>
                                <th style={{ ...styles.th, width: "25%" }}>Đơn giá nhập</th>
                                <th style={{ ...styles.th, width: "25%" }}>Thành tiền</th>
                                <th style={{ ...styles.th, width: "15%", textAlign: "center" }}>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chiTiet.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ ...styles.td, textAlign: "center", color: "#94a3b8", padding: "2rem" }}>
                                        Chưa có sản phẩm nào trong phiếu
                                    </td>
                                </tr>
                            ) : (
                                chiTiet.map((item, index) => (
                                    <tr key={index} style={styles.tr}>
                                        <td style={{ ...styles.td, fontWeight: "600", color: "#64748b" }}>{item.bienTheID}</td>
                                        <td style={{ ...styles.td, fontWeight: "600", color: "#0f172a" }}>{item.soLuong}</td>
                                        <td style={{ ...styles.td, color: "#334155" }}>{item.donGiaNhap.toLocaleString("vi-VN")} đ</td>
                                        <td style={{ ...styles.td, fontWeight: "600", color: "#16a34a" }}>{(item.soLuong * item.donGiaNhap).toLocaleString("vi-VN")} đ</td>
                                        <td style={{ ...styles.td, textAlign: "center" }}>
                                            <button onClick={() => handleRemoveRow(index)} style={styles.btnDelete}>
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Tổng cộng & Hoàn tất */}
                <div style={styles.footerSummary}>
                    <h3 style={styles.totalText}>Tổng cộng: <span style={{ color: "#16a34a" }}>{tongTien.toLocaleString("vi-VN")} đ</span></h3>
                    <button onClick={handleSubmit} style={styles.btnSubmit}>
                        HOÀN TẤT NHẬP KHO
                    </button>
                </div>
            </div>
        </div>
    );
}

// Hệ thống CSS chuẩn Dashboard Admin Nesty
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
    formGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        flex: 1,
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
    subCard: {
        backgroundColor: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        padding: "1.25rem",
        marginTop: "0.5rem",
    },
    subCardTitle: {
        fontSize: "0.95rem",
        fontWeight: "700",
        color: "#0f172a",
        margin: "0 0 1rem 0",
    },
    btnAddRow: {
        padding: "0.6rem 1.25rem",
        backgroundColor: "#2563eb",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "0.9rem",
        cursor: "pointer",
        height: "38px",
        whiteSpace: "nowrap",
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
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    btnDelete: {
        padding: "0.3rem 0.7rem",
        backgroundColor: "#fef2f2",
        color: "#dc2626",
        border: "1px solid #fecaca",
        borderRadius: "6px",
        fontWeight: "600",
        fontSize: "0.78rem",
        cursor: "pointer",
    },
    footerSummary: {
        marginTop: "1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        borderTop: "1px solid #e2e8f0",
        paddingTop: "1.25rem",
    },
    totalText: {
        fontSize: "1.15rem",
        fontWeight: "700",
        color: "#0f172a",
        margin: 0,
    },
    btnSubmit: {
        padding: "0.75rem 1.5rem",
        backgroundColor: "#16a34a",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontWeight: "700",
        fontSize: "0.95rem",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(22, 163, 74, 0.2)",
    },
};