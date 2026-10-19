import React, { useState, useEffect } from "react";
import { getKichThuocs, createKichThuoc, updateKichThuoc, deleteKichThuoc } from "../../api/kichThuocApi";

export default function KichThuocPage() {
    const [kichThuocs, setKichThuocs] = useState([]);
    const [form, setForm] = useState({ tenKichThuoc: "" });
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        try {
            const res = await getKichThuocs();
            setKichThuocs(res.data);
        } catch (error) { console.error(error); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) await updateKichThuoc(editingId, form);
            else await createKichThuoc(form);
            await loadData();
            setShowForm(false);
            setEditingId(null);
            setForm({ tenKichThuoc: "" });
        } catch (error) { console.error(error); }
    };

    const handleEdit = (item) => {
        setForm({ tenKichThuoc: item.tenKichThuoc });
        setEditingId(item.kichThuocID);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Xác nhận vô hiệu hóa kích thước này?")) return;
        try {
            await deleteKichThuoc(id);
            await loadData();
        } catch (error) { console.error(error); }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Quản lý kích thước</h2>
            <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ tenKichThuoc: "" }); }}>+ Thêm</button>
            {showForm && (
                <form onSubmit={handleSubmit} style={{ margin: "10px 0 20px 0" }}>
                    <input placeholder="Tên kích thước" value={form.tenKichThuoc} onChange={e => setForm({ ...form, tenKichThuoc: e.target.value })} required style={{ marginRight: "10px" }} />
                    <button type="submit" style={{ marginRight: "5px" }}>Lưu</button>
                    <button type="button" onClick={() => setShowForm(false)}>Hủy</button>
                </form>
            )}
            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead><tr><th>ID</th><th>Kích thước</th><th>Thao tác</th></tr></thead>
                <tbody>
                    {kichThuocs.map(item => (
                        <tr key={item.kichThuocID}>
                            <td>{item.kichThuocID}</td>
                            <td>{item.tenKichThuoc}</td>
                            <td>
                                <button onClick={() => handleEdit(item)} style={{ marginRight: "10px" }}>Sửa</button>
                                <button onClick={() => handleDelete(item.kichThuocID)}>Vô hiệu</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}