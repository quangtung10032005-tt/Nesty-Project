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

    // Hàm xử lý đổi trạng thái (Vô hiệu hóa / Hoạt động lại)
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
        <div style={{ padding: "20px" }}>
            <h2>Quản lý Sản phẩm</h2>

            <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm theo tên sản phẩm..."
                    style={{ padding: "5px" }}
                />
                <button onClick={() => loadSanPhams()} style={{ padding: "5px 10px" }}>Tìm kiếm</button>
                <button onClick={handleOpenAdd} style={{ padding: "5px 10px", background: "green", color: "white" }}>
                    + Thêm sản phẩm
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSave} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px", width: "400px" }}>
                    <h3>{editingId ? "Sửa sản phẩm" : "Thêm sản phẩm"}</h3>

                    <label>Tên sản phẩm:</label>
                    <input
                        required
                        value={formData.tenSanPham}
                        onChange={e => setFormData({ ...formData, tenSanPham: e.target.value })}
                    />

                    <label>Danh mục:</label>
                    <select
                        required
                        value={formData.danhMucID}
                        onChange={e => setFormData({ ...formData, danhMucID: e.target.value })}
                    >
                        <option value="">-- Chọn danh mục --</option>
                        {danhMucs.map(dm => (
                            <option key={dm.danhMucID} value={dm.danhMucID}>{dm.tenDanhMuc}</option>
                        ))}
                    </select>

                    <label>Thương hiệu:</label>
                    <input
                        value={formData.thuongHieu}
                        onChange={e => setFormData({ ...formData, thuongHieu: e.target.value })}
                    />

                    <label>Mô tả:</label>
                    <textarea
                        rows="3"
                        value={formData.moTa}
                        onChange={e => setFormData({ ...formData, moTa: e.target.value })}
                    ></textarea>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <button type="submit" style={{ padding: "5px 15px", background: "blue", color: "white" }}>Lưu</button>
                        <button type="button" onClick={() => setShowForm(false)} style={{ padding: "5px 15px" }}>Hủy</button>
                    </div>
                </form>
            )}

            <table border="1" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ background: "#f4f4f4" }}>
                        <th style={{ padding: "10px" }}>ID</th>
                        <th style={{ padding: "10px" }}>Tên sản phẩm</th>
                        <th style={{ padding: "10px" }}>Thương hiệu</th>
                        <th style={{ padding: "10px" }}>Trạng thái</th>
                        <th style={{ padding: "10px" }}>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {sanPhams.map((item) => (
                        <tr key={item.sanPhamID}>
                            <td style={{ padding: "10px" }}>{item.sanPhamID}</td>
                            <td style={{ padding: "10px" }}>{item.tenSanPham}</td>
                            <td style={{ padding: "10px" }}>{item.thuongHieu}</td>
                            <td style={{ padding: "10px" }}>
                                <span style={{ color: item.trangThai ? "green" : "red", fontWeight: "bold" }}>
                                    {item.trangThai ? "Hoạt động" : "Ngừng hoạt động"}
                                </span>
                            </td>
                            <td style={{ padding: "10px", display: "flex", gap: "5px" }}>
                                <button onClick={() => handleOpenEdit(item)}>Sửa</button>
                                <button onClick={() => navigate(`/admin/products/${item.sanPhamID}`)}>Quản lý</button>
                                
                                {/* Nút thay đổi trạng thái linh hoạt: Nếu đang hoạt động hiện nút Vô hiệu hóa, nếu ngừng hoạt động hiện nút Hoạt động lại */}
                                {item.trangThai ? (
                                    <button 
                                        onClick={() => handleToggleStatus(item)} 
                                        style={{ background: "#dc3545", color: "white", border: "none", padding: "3px 8px", cursor: "pointer" }}
                                    >
                                        Vô hiệu hóa
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => handleToggleStatus(item)} 
                                        style={{ background: "#28a745", color: "white", border: "none", padding: "3px 8px", cursor: "pointer" }}
                                    >
                                        Hoạt động lại
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}