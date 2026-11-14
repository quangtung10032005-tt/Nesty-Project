import { NavLink, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
    const navigate = useNavigate();

    // Hàm xử lý đăng xuất tài khoản
    const handleLogout = () => {
        if (window.confirm("Bạn có chắc chắn muốn đăng xuất khỏi hệ thống quản trị?")) {
            // Xóa thông tin xác thực (token, user) khỏi localStorage/sessionStorage
            localStorage.removeItem("adminToken");
            localStorage.removeItem("user");
            
            // Chuyển hướng về trang đăng nhập
            navigate("/login"); // Thay đổi đường dẫn login nếu cần thiết
        }
    };

    return (
        <div className="admin-layout" style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f9", fontFamily: "'Inter', sans-serif" }}>
            {/* Sidebar bên trái */}
            <aside style={{ width: "260px", backgroundColor: "#1e293b", color: "#fff", position: "fixed", height: "100vh", left: 0, top: 0, display: "flex", flexDirection: "column", zIndex: 100 }}>
                <h2 style={{ padding: "1.5rem", fontSize: "1.2rem", fontWeight: "700", color: "#38bdf8", borderBottom: "1px solid #334155", margin: 0 }}>Nesty Admin</h2>
                <nav style={{ padding: "1rem 0" }}>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        <li style={{ marginBottom: "4px" }}>
                            <NavLink to="/admin" end style={({ isActive }) => ({ ...baseLinkStyle, ...(isActive ? activeLinkStyle : {}) })}>Dashboard</NavLink>
                        </li>
                        <li style={{ marginBottom: "4px" }}>
                            <NavLink to="/admin/products" style={({ isActive }) => ({ ...baseLinkStyle, ...(isActive ? activeLinkStyle : {}) })}>Sản phẩm</NavLink>
                        </li>
                        <li style={{ marginBottom: "4px" }}>
                            <NavLink to="/admin/categories" style={({ isActive }) => ({ ...baseLinkStyle, ...(isActive ? activeLinkStyle : {}) })}>Danh mục</NavLink>
                        </li>
                        <li style={{ marginBottom: "4px" }}>
                            <NavLink to="/admin/don-hang" style={({ isActive }) => ({ ...baseLinkStyle, ...(isActive ? activeLinkStyle : {}) })}>Đơn hàng</NavLink>
                        </li>
                        <li style={{ marginBottom: "4px" }}>
                            <NavLink to="/admin/ton-kho" style={({ isActive }) => ({ ...baseLinkStyle, ...(isActive ? activeLinkStyle : {}) })}>Kho</NavLink>
                        </li>
                        <li style={{ marginBottom: "4px" }}>
                            <NavLink to="/admin/khach-hang" style={({ isActive }) => ({ ...baseLinkStyle, ...(isActive ? activeLinkStyle : {}) })}>Khách hàng</NavLink>
                        </li>
                        <li style={{ marginBottom: "4px" }}>
                            <NavLink to="/admin/chatbot" style={({ isActive }) => ({ ...baseLinkStyle, ...(isActive ? activeLinkStyle : {}) })}>Chatbot</NavLink>
                        </li>
                        <li style={{ marginBottom: "4px" }}>
                            <NavLink to="/admin/reports" style={({ isActive }) => ({ ...baseLinkStyle, ...(isActive ? activeLinkStyle : {}) })}>Báo cáo</NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Nội dung chính bên phải */}
            <section style={{ marginLeft: "260px", flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Header phía trên */}
                <header style={{ backgroundColor: "#fff", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)" }}>
                    <h1 style={{ fontSize: "1.25rem", fontWeight: "600", margin: 0, color: "#1e293b" }}>Admin Dashboard</h1>
                    
                    {/* Khu vực thông tin Admin và nút Đăng xuất ở góc phải */}
                    <div style={styles.adminProfileSection}>
                        <div style={styles.adminInfo}>
                            <div style={styles.adminAvatar}>A</div>
                            <div style={styles.adminTextGroup}>
                                <span style={styles.adminName}>Quản trị viên</span>
                                <span style={styles.adminRole}>Admin</span>
                            </div>
                        </div>
                        <button onClick={handleLogout} style={styles.btnLogout} title="Đăng xuất hệ thống">
                            Đăng xuất
                        </button>
                    </div>
                </header>

                <main style={{ padding: "2rem", flex: 1 }}>
                    <Outlet />
                </main>
            </section>
        </div>
    );
}

// Style mặc định cho các mục menu
const baseLinkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "0.85rem 1.5rem",
    color: "#94a3b8",
    textDecoration: "none",
    fontWeight: "500",
};

// Style khi mục đó đang được chọn (active)
const activeLinkStyle = {
    color: "#fff",
    backgroundColor: "#0f172a",
    borderLeft: "4px solid #38bdf8",
};

// Bổ sung style CSS cho phần Admin Profile & Nút Đăng xuất ở góc phải
const styles = {
    adminProfileSection: {
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
    },
    adminInfo: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    adminAvatar: {
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        backgroundColor: "#2563eb",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        fontSize: "0.9rem",
    },
    adminTextGroup: {
        display: "flex",
        flexDirection: "column",
    },
    adminName: {
        fontSize: "0.85rem",
        fontWeight: "700",
        color: "#0f172a",
    },
    adminRole: {
        fontSize: "0.75rem",
        color: "#64748b",
        fontWeight: "500",
    },
    btnLogout: {
        padding: "0.45rem 0.9rem",
        backgroundColor: "#fef2f2",
        color: "#dc2626",
        border: "1px solid #fecaca",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "0.82rem",
        cursor: "pointer",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
    },
};

export default AdminLayout;