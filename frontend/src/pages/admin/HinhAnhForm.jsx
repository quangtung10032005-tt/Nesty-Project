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
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input
                type="text"
                placeholder="URL Hình ảnh (Xóa trống và Lưu để xóa ảnh)"
                value={duongDanAnh}
                onChange={e => setDuongDanAnh(e.target.value)}
                style={{ width: "100%", padding: "8px", background: "#333", color: "white", border: "1px solid #555" }}
            />
            <label style={{ cursor: "pointer", color: "white" }}>
                <input
                    type="checkbox"
                    checked={laAnhChinh}
                    onChange={e => setLaAnhChinh(e.target.checked)}
                    style={{ marginRight: "5px" }}
                />
                Ảnh chính
            </label>
            <div>
                <button type="submit" style={{ marginRight: "10px", padding: "5px 15px", background: "gray", color: "white" }}>Lưu</button>
                <button type="button" onClick={onCancel} style={{ padding: "5px 15px", background: "gray", color: "white" }}>Hủy</button>
            </div>
        </form>
    );
}