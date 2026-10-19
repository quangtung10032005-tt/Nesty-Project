import React, { useState, useEffect } from "react";
import { getMauSacs, createMauSac, updateMauSac, deleteMauSac } from "../../api/mauSacApi";

export default function MauSacPage() {
    const [mauSacs, setMauSacs] = useState([]);
    const [form, setForm] = useState({ tenMau: "", maMau: "" });
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        try {
            const res = await getMauSacs();
            setMauSacs(res.data);
        } catch (error) { console.error(error); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) await updateMauSac(editingId, form);
            else await createMauSac(form);
            await loadData();
            setShowForm(false);
            setEditingId(null);
            setForm({ tenMau: "", maMau: "" });
        } catch (error) { console.error(error); }
    };

    const handleEdit = (item) => {
        setForm({ tenMau: item.tenMau, maMau: item.maMau || "" });
        setEditingId(item.mauSacID);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Xác nhận vô hiệu hóa màu sắc này?")) return;
        try {
            await deleteMauSac(id);
            await loadData();
        } catch (error) { console.error(error); }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Quản lý màu sắc</h2>
            <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ tenMau: "", maMau: "" }); }}>+ Thêm</button>
            {showForm && (
                <form onSubmit={handleSubmit} style={{ margin: "10px 0 20px 0" }}>
                    <input placeholder="Tên màu" value={form.tenMau} onChange={e => setForm({ ...form, tenMau: e.target.value })} required style={{ marginRight: "10px" }} />
                    <input placeholder="Mã màu (VD: #000000)" value={form.maMau} onChange={e => setForm({ ...form, maMau: e.target.value })} style={{ marginRight: "10px" }} />
                    <button type="submit" style={{ marginRight: "5px" }}>Lưu</button>
                    <button type="button" onClick={() => setShowForm(false)}>Hủy</button>
                </form>
            )}
            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead><tr><th>ID</th><th>Tên màu</th><th>Mã màu</th><th>Thao tác</th></tr></thead>
                <tbody>
                    {mauSacs.map(item => (
                        <tr key={item.mauSacID}>
                            <td>{item.mauSacID}</td>
                            <td>{item.tenMau}</td>
                            <td>{item.maMau}</td>
                            <td>
                                <button onClick={() => handleEdit(item)} style={{ marginRight: "10px" }}>Sửa</button>
                                <button onClick={() => handleDelete(item.mauSacID)}>Vô hiệu</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}