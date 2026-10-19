import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tenDangNhap: "",
    matKhau: "",
    hoTen: "",
    soDienThoai: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await register(formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.vaiTro);
      alert("Đăng ký thành công!");
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại. Tên đăng nhập có thể đã tồn tại.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>Đăng ký tài khoản</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Tên đăng nhập:</label>
          <input type="text" name="tenDangNhap" required value={formData.tenDangNhap} onChange={handleChange} style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Mật khẩu:</label>
          <input type="password" name="matKhau" required value={formData.matKhau} onChange={handleChange} style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Họ và tên:</label>
          <input type="text" name="hoTen" required value={formData.hoTen} onChange={handleChange} style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Số điện thoại:</label>
          <input type="text" name="soDienThoai" value={formData.soDienThoai} onChange={handleChange} style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: "100%", padding: 8 }} />
        </div>
        <button type="submit" style={{ width: "100%", padding: 10, background: "#007bff", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
          Đăng ký
        </button>
      </form>
      <p style={{ marginTop: 15 }}>
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
}