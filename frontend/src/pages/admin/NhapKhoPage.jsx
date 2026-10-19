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
        <div style={{ padding: "20px" }}>
            <h2>Tạo phiếu nhập kho</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px", maxWidth: "600px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                    <input type="number" placeholder="ID Kho (VD: 3)" value={khoID} onChange={(e) => setKhoID(e.target.value)} required style={{ flex: 1 }} />
                    <input type="number" placeholder="ID Nhà cung cấp (VD: 1)" value={nhaCungCapID} onChange={(e) => setNhaCungCapID(e.target.value)} required style={{ flex: 1 }} />
                </div>
                <textarea placeholder="Ghi chú phiếu nhập" value={ghiChu} onChange={(e) => setGhiChu(e.target.value)} rows="3" />

                <h4 style={{ margin: "10px 0 0 0" }}>Thêm sản phẩm nhập</h4>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <input type="number" placeholder="ID Biến thể" value={bienTheID} onChange={(e) => setBienTheID(e.target.value)} style={{ width: "100px" }} />
                    <input type="number" placeholder="Số lượng" value={soLuong} onChange={(e) => setSoLuong(e.target.value)} style={{ width: "100px" }} />
                    <input type="number" placeholder="Đơn giá nhập" value={donGiaNhap} onChange={(e) => setDonGiaNhap(e.target.value)} style={{ width: "120px" }} />
                    <button type="button" onClick={handleAddRow} style={{ padding: "3px 10px" }}>+ Thêm</button>
                </div>
            </form>

            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>ID Biến thể</th>
                        <th>Số lượng</th>
                        <th>Đơn giá nhập</th>
                        <th>Thành tiền</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {chiTiet.length === 0 ? (
                        <tr><td colSpan="5" style={{ textAlign: "center" }}>Chưa có sản phẩm nào trong phiếu</td></tr>
                    ) : (
                        chiTiet.map((item, index) => (
                            <tr key={index}>
                                <td>{item.bienTheID}</td>
                                <td>{item.soLuong}</td>
                                <td>{item.donGiaNhap.toLocaleString("vi-VN")} đ</td>
                                <td>{(item.soLuong * item.donGiaNhap).toLocaleString("vi-VN")} đ</td>
                                <td style={{ textAlign: "center" }}>
                                    <button onClick={() => handleRemoveRow(index)} style={{ color: "red", cursor: "pointer" }}>X</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0 }}>Tổng cộng: {tongTien.toLocaleString("vi-VN")} đ</h3>
                <button onClick={handleSubmit} style={{ padding: "10px 20px", backgroundColor: "green", color: "white", border: "none", cursor: "pointer", fontWeight: "bold" }}>
                    HOÀN TẤT NHẬP KHO
                </button>
            </div>
        </div>
    );
}