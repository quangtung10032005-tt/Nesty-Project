import React, { useState, useEffect } from "react";
import { getDanhMucs, createDanhMuc, updateDanhMuc, deleteDanhMuc } from "../../api/danhMucApi";

export default function DanhMucPage() {
    const [danhMucs, setDanhMucs] = useState([]);
    const [form, setForm] = useState({ tenDanhMuc: "", moTa: "" });
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await getDanhMucs();
            setDanhMucs(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateDanhMuc(editingId, form);
            } else {
                await createDanhMuc(form);
            }
            await loadData();
            setShowForm(false);
            setEditingId(null);
            setForm({ tenDanhMuc: "", moTa: "" });
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (item) => {
        setForm({ tenDanhMuc: item.tenDanhMuc, moTa: item.moTa || "" });
        setEditingId(item.danhMucID);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Xác nhận vô hiệu hóa danh mục này?")) return;
        try {
            await deleteDanhMuc(id);
            await loadData();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Quản lý danh mục</h2>
            <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ tenDanhMuc: "", moTa: "" }); }}>
                + Thêm
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} style={{ marginTop: "10px", marginBottom: "20px" }}>
                    <input
                        placeholder="Tên danh mục"
                        value={form.tenDanhMuc}
                        onChange={e => setForm({ ...form, tenDanhMuc: e.target.value })}
                        required
                        style={{ marginRight: "10px" }}
                    />
                    <input
                        placeholder="Mô tả"
                        value={form.moTa}
                        onChange={e => setForm({ ...form, moTa: e.target.value })}
                        style={{ marginRight: "10px" }}
                    />
                    <button type="submit" style={{ marginRight: "5px" }}>Lưu</button>
                    <button type="button" onClick={() => setShowForm(false)}>Hủy</button>
                </form>
            )}

            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên danh mục</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {danhMucs.map(item => (
                        <tr key={item.danhMucID}>
                            <td>{item.danhMucID}</td>
                            <td>{item.tenDanhMuc}</td>
                            <td>{item.trangThai ? "Hoạt động" : "Vô hiệu"}</td>
                            <td>
                                <button onClick={() => handleEdit(item)} style={{ marginRight: "10px" }}>Sửa</button>
                                <button onClick={() => handleDelete(item.danhMucID)}>Vô hiệu</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}