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
        <div style={styles.formCard}>
            <h3 style={styles.formTitle}>Thêm biến thể sản phẩm</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Kích thước:</label>
                    <select 
                        value={formData.kichThuocID}
                        onChange={e => setFormData({ ...formData, kichThuocID: e.target.value })} 
                        required 
                        style={styles.inputField}
                    >
                        <option value="">-- Chọn kích thước --</option>
                        {kichThuocs.map(k => <option key={k.kichThuocID} value={k.kichThuocID}>{k.tenKichThuoc}</option>)}
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Màu sắc:</label>
                    <select 
                        value={formData.mauSacID}
                        onChange={e => setFormData({ ...formData, mauSacID: e.target.value })} 
                        required 
                        style={styles.inputField}
                    >
                        <option value="">-- Chọn màu sắc --</option>
                        {mauSacs.map(m => <option key={m.mauSacID} value={m.mauSacID}>{m.tenMau}</option>)}
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Mã SKU:</label>
                    <input 
                        type="text" 
                        placeholder="Nhập mã SKU..." 
                        value={formData.sku}
                        onChange={e => setFormData({ ...formData, sku: e.target.value })} 
                        required 
                        style={styles.inputField} 
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Giá bán (VNĐ):</label>
                    <input 
                        type="number" 
                        placeholder="Nhập giá bán..." 
                        value={formData.giaBan}
                        onChange={e => setFormData({ ...formData, giaBan: e.target.value })} 
                        required 
                        style={styles.inputField} 
                    />
                </div>

                <div style={styles.buttonGroup}>
                    <button type="submit" style={styles.btnSave}>Lưu</button>
                    <button type="button" onClick={onCancel} style={styles.btnCancel}>Hủy bỏ</button>
                </div>
            </form>
        </div>
    );
}

// Đối tượng CSS chuyên nghiệp, đồng bộ với hệ thống Admin
const styles = {
    formCard: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        border: "1px solid #cbd5e1",
        maxWidth: "450px",
        marginBottom: "1.5rem",
    },
    formTitle: {
        fontSize: "1.1rem",
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: "1rem",
        marginTop: 0,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
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
    },
    buttonGroup: {
        display: "flex",
        gap: "10px",
        marginTop: "8px",
    },
    btnSave: {
        padding: "0.6rem 1.25rem",
        backgroundColor: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "0.9rem",
        cursor: "pointer",
    },
    btnCancel: {
        padding: "0.6rem 1.25rem",
        backgroundColor: "#e2e8f0",
        color: "#334155",
        border: "none",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "0.9rem",
        cursor: "pointer",
    },
};