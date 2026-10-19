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
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
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
            setError("Sai tên đăng nhập hoặc mật khẩu.");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
            <h2>Đăng nhập</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 12 }}>
                    <label>Tên đăng nhập:</label>
                    <input type="text" required value={tenDangNhap} onChange={(e) => setTenDangNhap(e.target.value)} style={{ width: "100%", padding: 8 }} />
                </div>
                <div style={{ marginBottom: 12 }}>
                    <label>Mật khẩu:</label>
                    <input type="password" required value={matKhau} onChange={(e) => setMatKhau(e.target.value)} style={{ width: "100%", padding: 8 }} />
                </div>
                <button type="submit" style={{ width: "100%", padding: 10, background: "#28a745", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
                    Đăng nhập
                </button>
            </form>
            <p style={{ marginTop: 15 }}>
                Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
            </p>
        </div>
    );
}







