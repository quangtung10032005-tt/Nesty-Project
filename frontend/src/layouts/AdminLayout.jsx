import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <div className="admin-layout">
            <aside>
                <h2>Nesty Admin</h2>
                <nav>
                    <ul>
                        <li><Link to="/admin">Dashboard</Link></li>
                        <li><Link to="/admin/products">Sản phẩm</Link></li>
                        <li><Link to="/admin/categories">Danh mục</Link></li>
                        <li><Link to="/admin/don-hang">Đơn hàng</Link></li>
                        <li><Link to="/admin/ton-kho">Kho</Link></li>
                        <li><Link to="/admin/khach-hang">Khách hàng</Link></li>
                        <li><Link to="/admin/chatbot">Chatbot</Link></li>
                        <li><Link to="/admin/reports">Báo cáo</Link></li>
                    </ul>
                </nav>
            </aside>

            <section>
                <header>
                    <h1>Admin Dashboard</h1>
                </header>
                <main>
                    <Outlet />
                </main>
            </section>
        </div>
    );
}

export default AdminLayout;