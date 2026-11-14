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

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
                <span style={{ color: "#64748b", fontWeight: "500" }}>Đang tải thông tin...</span>
            </div>
        );
    }

    return (
        <div style={styles.pageContainer}>
            <div style={styles.card}>
                <div style={styles.headerRow}>
                    <h2 style={styles.title}>Hồ sơ cá nhân</h2>
                    <button onClick={handleLogout} style={styles.logoutButton}>
                        Đăng xuất
                    </button>
                </div>
                {message && <div style={styles.messageAlert}>{message}</div>}
                <form onSubmit={handleUpdate} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Họ và tên:</label>
                        <input type="text" name="hoTen" value={formData.hoTen} onChange={handleChange} required style={styles.input} />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Số điện thoại:</label>
                        <input type="text" name="soDienThoai" value={formData.soDienThoai} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Ngày sinh:</label>
                        <input type="date" name="ngaySinh" value={formData.ngaySinh} onChange={handleChange} style={styles.input} />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Giới tính:</label>
                        <select name="gioiTinh" value={formData.gioiTinh} onChange={handleChange} style={styles.input}>
                            <option value="">Chọn giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>
                    <button type="submit" style={styles.submitButton}>
                        Lưu thay đổi
                    </button>
                </form>
            </div>
        </div>
    );
}

// Hệ thống CSS chuẩn Enterprise Design System
const styles = {
    pageContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
    },
    card: {
        width: "100%",
        maxWidth: "500px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "2.25rem 2.5rem",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
        border: "1px solid #e2e8f0",
    },
    headerRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem",
        borderBottom: "1px solid #f1f5f9",
        paddingBottom: "1rem",
    },
    title: {
        fontSize: "1.35rem",
        fontWeight: "700",
        color: "#0f172a",
        margin: 0,
    },
    logoutButton: {
        padding: "0.5rem 1rem",
        backgroundColor: "#fef2f2",
        color: "#dc2626",
        border: "1px solid #fecaca",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "0.85rem",
        cursor: "pointer",
        transition: "all 0.2s ease",
    },
    messageAlert: {
        backgroundColor: "#f0fdf4",
        color: "#16a34a",
        padding: "0.75rem 1rem",
        borderRadius: "8px",
        fontSize: "0.875rem",
        fontWeight: "600",
        marginBottom: "1.25rem",
        border: "1px solid #bbf7d0",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    label: {
        fontSize: "0.875rem",
        fontWeight: "600",
        color: "#334155",
    },
    input: {
        width: "100%",
        padding: "0.75rem 1rem",
        fontSize: "0.95rem",
        borderRadius: "8px",
        border: "1px solid #cbd5e1",
        backgroundColor: "#f8fafc",
        color: "#0f172a",
        outline: "none",
        boxSizing: "border-box",
        transition: "all 0.2s ease",
    },
    submitButton: {
        width: "100%",
        padding: "0.85rem",
        backgroundColor: "#2563eb",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "700",
        fontSize: "0.95rem",
        cursor: "pointer",
        boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
        marginTop: "0.5rem",
        transition: "background-color 0.2s ease",
    },
    loadingContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "350px",
        gap: "10px",
    },
    spinner: {
        width: "36px",
        height: "36px",
        border: "3px solid #e2e8f0",
        borderTop: "3px solid #2563eb",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
    },
};