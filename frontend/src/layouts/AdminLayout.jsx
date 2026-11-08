import { NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <div className="admin-layout" style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f9", fontFamily: "'Inter', sans-serif" }}>
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

            <section style={{ marginLeft: "260px", flex: 1, display: "flex", flexDirection: "column" }}>
                <header style={{ backgroundColor: "#fff", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)" }}>
                    <h1 style={{ fontSize: "1.25rem", fontWeight: "600", margin: 0, color: "#1e293b" }}>Admin Dashboard</h1>
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

export default AdminLayout;