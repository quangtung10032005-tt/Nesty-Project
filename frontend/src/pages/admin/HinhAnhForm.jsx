//import React, { useState } from "react";
//import { createHinhAnh } from "../../api/hinhAnhApi";

//export default function HinhAnhForm({ sanPhamId, onSuccess, onCancel }) {
//    const [formData, setFormData] = useState({
//        sanPhamID: sanPhamId,
//        duongDanAnh: "",
//        laAnhChinh: false
//    });

//    const handleSubmit = async (e) => {
//        e.preventDefault();
//        try {
//            await createHinhAnh(formData);
//            onSuccess();
//        } catch (error) {
//            console.error(error);
//        }
//    };

//    return (
//        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//            <input type="text" placeholder="URL Hình ảnh" onChange={e => setFormData({ ...formData, duongDanAnh: e.target.value })} required />
//            <label>
//                <input type="checkbox" onChange={e => setFormData({ ...formData, laAnhChinh: e.target.checked })} />
//                Ảnh chính
//            </label>
//            <div>
//                <button type="submit" style={{ marginRight: "10px" }}>Lưu</button>
//                <button type="button" onClick={onCancel}>Hủy</button>
//            </div>
//        </form>
//    );
//}



import React, { useState, useEffect } from "react";
import { createHinhAnh, updateHinhAnh, deleteHinhAnh } from "../../api/hinhAnhApi";

export default function HinhAnhForm({ sanPhamId, initialData, onSuccess, onCancel }) {
    const [duongDanAnh, setDuongDanAnh] = useState("");
    const [laAnhChinh, setLaAnhChinh] = useState(false);

    // Điền dữ liệu nếu đang click vào ảnh để sửa
    useEffect(() => {
        if (initialData) {
            setDuongDanAnh(initialData.duongDanAnh || "");
            setLaAnhChinh(initialData.laAnhChinh || false);
        } else {
            setDuongDanAnh("");
            setLaAnhChinh(false);
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (initialData) {
                // ĐANG SỬA: Nếu URL trống -> Gọi API Xóa, Nếu có URL -> Gọi API Cập nhật
                if (!duongDanAnh.trim()) {
                    if (window.confirm("URL trống. Bạn có muốn xóa hình ảnh này không?")) {
                        await deleteHinhAnh(initialData.hinhAnhID);
                    } else {
                        return; // Hủy thao tác nếu không muốn xóa
                    }
                } else {
                    await updateHinhAnh(initialData.hinhAnhID, {
                        duongDanAnh: duongDanAnh,
                        laAnhChinh: laAnhChinh
                    });
                }
            } else {
                // THÊM MỚI
                if (!duongDanAnh.trim()) {
                    alert("Vui lòng nhập URL hình ảnh!");
                    return;
                }
                await createHinhAnh({
                    sanPhamID: sanPhamId,
                    duongDanAnh: duongDanAnh,
                    laAnhChinh: laAnhChinh
                });
            }
            onSuccess(); // Tải lại danh sách và đóng form
        } catch (error) {
            console.error("Lỗi khi lưu/xóa hình ảnh:", error);
        }
    };

    return (
        <div style={styles.formContainer}>
            <h3 style={styles.formTitle}>
                {initialData ? "Chỉnh sửa hình ảnh" : "Thêm hình ảnh mới"}
            </h3>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Đường dẫn URL hình ảnh:</label>
                    <input
                        type="text"
                        placeholder="URL Hình ảnh (Xóa trống và Lưu để xóa ảnh)"
                        value={duongDanAnh}
                        onChange={e => setDuongDanAnh(e.target.value)}
                        style={styles.inputField}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={laAnhChinh}
                            onChange={e => setLaAnhChinh(e.target.checked)}
                            style={{ width: "16px", height: "16px", cursor: "pointer" }}
                        />
                        <span style={{ fontWeight: "600", color: "#334155" }}>Đặt làm ảnh chính</span>
                    </label>
                </div>

                <div style={styles.buttonGroup}>
                    <button type="submit" style={styles.btnSave}>Lưu</button>
                    <button type="button" onClick={onCancel} style={styles.btnCancel}>Hủy bỏ</button>
                </div>
            </form>
        </div>
    );
}

// Hệ thống CSS chuẩn Dashboard Admin Nesty
const styles = {
    formContainer: {
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: "1.25rem",
        border: "1px solid #cbd5e1",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        maxWidth: "500px",
        margin: "0.5rem 0",
    },
    formTitle: {
        fontSize: "1rem",
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
        width: "100%",
        boxSizing: "border-box",
    },
    checkboxLabel: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        userSelect: "none",
        marginTop: "4px",
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