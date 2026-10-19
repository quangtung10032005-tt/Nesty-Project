import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../api/authApi";

export default function Profile() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        hoTen: "",
        soDienThoai: "",
        email: "",
        ngaySinh: "",
        gioiTinh: "",
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getProfile();
                setFormData({
                    hoTen: res.data.hoTen || "",
                    soDienThoai: res.data.soDienThoai || "",
                    email: res.data.email || "",
                    ngaySinh: res.data.ngaySinh ? res.data.ngaySinh.split("T")[0] : "",
                    gioiTinh: res.data.gioiTinh || "",
                });
            } catch (err) {
                alert("Phiên đăng nhập hết hạn hoặc không hợp lệ!");
                localStorage.removeItem("token");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            await updateProfile(formData);
            setMessage("Cập nhật thông tin thành công!");
        } catch (err) {
            setMessage("Cập nhật thất bại.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    if (loading) return <p style={{ textAlign: "center", marginTop: 50 }}>Đang tải thông tin...</p>;

    return (
        <div style={{ maxWidth: 450, margin: "40px auto", padding: 25, border: "1px solid #ccc", borderRadius: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Hồ sơ cá nhân</h2>
                <button onClick={handleLogout} style={{ padding: "6px 12px", background: "#dc3545", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
                    Đăng xuất
                </button>
            </div>
            {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}
            <form onSubmit={handleUpdate}>
                <div style={{ marginBottom: 12 }}>
                    <label>Họ và tên:</label>
                    <input type="text" name="hoTen" value={formData.hoTen} onChange={handleChange} required style={{ width: "100%", padding: 8 }} />
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>Số điện thoại:</label>
                    <input type="text" name="soDienThoai" value={formData.soDienThoai} onChange={handleChange} style={{ width: "100%", padding: 8 }} />
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: "100%", padding: 8 }} />
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>Ngày sinh:</label>
                    <input type="date" name="ngaySinh" value={formData.ngaySinh} onChange={handleChange} style={{ width: "100%", padding: 8 }} />
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>Giới tính:</label>
                    <select name="gioiTinh" value={formData.gioiTinh} onChange={handleChange} style={{ width: "100%", padding: 8 }}>
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </div>
                <button type="submit" style={{ width: "100%", padding: 10, background: "#007bff", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
                    Lưu thay đổi
                </button>
            </form>
        </div>
    );
}