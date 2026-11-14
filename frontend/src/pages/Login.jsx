//import React, { useState } from "react";
//import { useNavigate, Link } from "react-router-dom";
//import { login } from "../api/authApi";

//export default function Login() {
//    const navigate = useNavigate();
//    const [tenDangNhap, setTenDangNhap] = useState("");
//    const [matKhau, setMatKhau] = useState("");
//    const [error, setError] = useState("");

//    const handleSubmit = async (e) => {
//        e.preventDefault();
//        setError("");
//        try {
//            const res = await login({ tenDangNhap, matKhau });
//            localStorage.setItem("token", res.data.token);
//            localStorage.setItem("role", res.data.vaiTro);
//            navigate("/profile");
//        } catch (err) {
//            setError("Sai tên đăng nhập hoặc mật khẩu.");
//        }
//    };

//    return (
//        <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
//            <h2>Đăng nhập</h2>
//            {error && <p style={{ color: "red" }}>{error}</p>}
//            <form onSubmit={handleSubmit}>
//                <div style={{ marginBottom: 12 }}>
//                    <label>Tên đăng nhập:</label>
//                    <input type="text" required value={tenDangNhap} onChange={(e) => setTenDangNhap(e.target.value)} style={{ width: "100%", padding: 8 }} />
//                </div>
//                <div style={{ marginBottom: 12 }}>
//                    <label>Mật khẩu:</label>
//                    <input type="password" required value={matKhau} onChange={(e) => setMatKhau(e.target.value)} style={{ width: "100%", padding: 8 }} />
//                </div>
//                <button type="submit" style={{ width: "100%", padding: 10, background: "#28a745", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
//                    Đăng nhập
//                </button>
//            </form>
//            <p style={{ marginTop: 15 }}>
//                Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
//            </p>
//        </div>
//    );
//}


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/authApi";

export default function Login() {
    const navigate = useNavigate();
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Trạng thái ẩn/hiện mật khẩu
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await login({ tenDangNhap, matKhau });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.vaiTro);

            if (res.data.vaiTro === "Admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            setError("Sai tên đăng nhập hoặc mật khẩu. Vui lòng kiểm tra lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.card}>
                {/* Brand Header */}
                <div style={styles.headerContainer}>
                    <h1 style={styles.brandTitle}>NESTY</h1>
                    <h2 style={styles.title}>Đăng nhập</h2>
                    <p style={styles.subtitle}>Nhập thông tin tài khoản để tiếp tục</p>
                </div>

                {error && <div style={styles.errorAlert}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Tên đăng nhập</label>
                        <input
                            type="text"
                            required
                            value={tenDangNhap}
                            onChange={(e) => setTenDangNhap(e.target.value)}
                            placeholder="Nhập tên đăng nhập của bạn"
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Mật khẩu</label>
                        <div style={styles.passwordWrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={matKhau}
                                onChange={(e) => setMatKhau(e.target.value)}
                                placeholder="••••••••"
                                style={styles.passwordInput}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={styles.eyeButton}
                                title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.submitButton,
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? "not-allowed" : "pointer"
                        }}
                    >
                        {loading ? "Đang xác thực..." : "Đăng nhập"}
                    </button>
                </form>

                <div style={styles.footerContainer}>
                    <p style={styles.footerText}>
                        Chưa có tài khoản?{" "}
                        <Link to="/register" style={styles.link}>
                            Đăng ký ngay
                        </Link>
                    </p>
                    <div style={{ marginTop: "1rem" }}>
                        <Link to="/" style={styles.backLink}>
                            Quay lại trang chủ cửa hàng
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Hệ thống CSS thiết kế đồng bộ với tiêu chuẩn Nesty Admin & Storefront
const styles = {
    pageContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "85vh",
        backgroundColor: "#f8fafc",
        padding: "1rem",
    },
    card: {
        width: "100%",
        maxWidth: "420px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "2.5rem 2rem",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
        border: "1px solid #e2e8f0",
    },
    headerContainer: {
        textAlign: "center",
        marginBottom: "1.75rem",
    },
    brandTitle: {
        fontSize: "1.5rem",
        fontWeight: "900",
        color: "#2563eb",
        letterSpacing: "-0.05em",
        marginBottom: "0.5rem",
    },
    title: {
        fontSize: "1.25rem",
        fontWeight: "700",
        color: "#0f172a",
        margin: "0 0 4px 0",
    },
    subtitle: {
        fontSize: "0.85rem",
        color: "#64748b",
        margin: 0,
    },
    errorAlert: {
        backgroundColor: "#fef2f2",
        color: "#dc2626",
        padding: "0.75rem 1rem",
        borderRadius: "8px",
        fontSize: "0.85rem",
        fontWeight: "600",
        marginBottom: "1.25rem",
        border: "1px solid #fecaca",
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
        fontSize: "0.85rem",
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
        transition: "all 0.2s ease",
        boxSizing: "border-box",
    },
    passwordWrapper: {
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    passwordInput: {
        width: "100%",
        padding: "0.75rem 2.5rem 0.75rem 1rem", // Chừa chỗ bên phải cho nút con mắt
        fontSize: "0.95rem",
        borderRadius: "8px",
        border: "1px solid #cbd5e1",
        backgroundColor: "#f8fafc",
        color: "#0f172a",
        outline: "none",
        transition: "all 0.2s ease",
        boxSizing: "border-box",
    },
    eyeButton: {
        position: "absolute",
        right: "12px",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1.1rem",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        transition: "background-color 0.2s ease, box-shadow 0.2s ease",
        boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
        marginTop: "0.5rem",
    },
    footerContainer: {
        textAlign: "center",
        marginTop: "1.5rem",
        borderTop: "1px solid #f1f5f9",
        paddingTop: "1.25rem",
    },
    footerText: {
        fontSize: "0.875rem",
        color: "#64748b",
        margin: 0,
    },
    link: {
        color: "#2563eb",
        fontWeight: "600",
        textDecoration: "none",
    },
    backLink: {
        fontSize: "0.82rem",
        color: "#64748b",
        textDecoration: "none",
        fontWeight: "500",
    },
};







