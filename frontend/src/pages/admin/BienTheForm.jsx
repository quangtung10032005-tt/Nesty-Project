import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import { createBienThe } from "../../api/bienTheApi";

export default function BienTheForm({ sanPhamId, onSuccess, onCancel }) {
    const [kichThuocs, setKichThuocs] = useState([]);
    const [mauSacs, setMauSacs] = useState([]);
    const [formData, setFormData] = useState({
        sanPhamID: sanPhamId,
        kichThuocID: "",
        mauSacID: "",
        sku: "",
        giaBan: ""
    });

    useEffect(() => {
        axiosClient.get("/admin/kich-thuoc").then(res => setKichThuocs(res.data));
        axiosClient.get("/admin/mau-sac").then(res => setMauSacs(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBienThe(formData);
            onSuccess();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <select onChange={e => setFormData({ ...formData, kichThuocID: e.target.value })} required>
                <option value="">Chọn Kích thước</option>
                {kichThuocs.map(k => <option key={k.kichThuocID} value={k.kichThuocID}>{k.tenKichThuoc}</option>)}
            </select>
            <select onChange={e => setFormData({ ...formData, mauSacID: e.target.value })} required>
                <option value="">Chọn Màu sắc</option>
                {mauSacs.map(m => <option key={m.mauSacID} value={m.mauSacID}>{m.tenMau}</option>)}
            </select>
            <input type="text" placeholder="SKU" onChange={e => setFormData({ ...formData, sku: e.target.value })} required />
            <input type="number" placeholder="Giá bán" onChange={e => setFormData({ ...formData, giaBan: e.target.value })} required />
            <div>
                <button type="submit" style={{ marginRight: "10px" }}>Lưu</button>
                <button type="button" onClick={onCancel}>Hủy</button>
            </div>
        </form>
    );
}