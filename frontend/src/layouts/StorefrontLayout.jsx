import { Link, Outlet } from "react-router-dom";
import ChatbotWidget from "../components/client/ChatbotWidget";

function StorefrontLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
            {/* Header / Navbar */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-4xl font-black text-blue-600 tracking-tighter">
                                NESTY
                            </Link>
                        </div>

                        {/* Navigation Links (Giữa) */}
                        <nav className="hidden md:flex space-x-8">
                            <Link to="/" className="text-gray-700 hover:text-blue-600 font-bold text-lg transition-colors">Trang chủ</Link>
                            <Link to="/products" className="text-gray-700 hover:text-blue-600 font-bold text-lg transition-colors">Sản phẩm</Link>
                            <Link to="/theo-doi-don-hang" className="text-gray-700 hover:text-blue-600 font-bold text-lg transition-colors">Theo dõi đơn</Link>
                        </nav>

                        {/* Right side actions */}
                        <div className="flex items-center space-x-6">
                            {/* Chuyển Lịch sử mua hàng lên đây cho to rõ */}
                            <Link to="/lich-su-mua-hang" className="text-gray-700 hover:text-blue-600 font-bold transition-colors">
                                Lịch sử mua hàng
                            </Link>
                            <Link to="/cart" className="text-gray-700 hover:text-blue-600 font-bold transition-colors">
                                Giỏ hàng
                            </Link>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-bold transition-colors">
                                Tài khoản
                            </Link>
                            <Link to="/login" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
                                Đăng nhập
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            <ChatbotWidget />

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    <h3 className="text-3xl font-extrabold mb-4 tracking-wider">Nesty Shoes</h3>
                    <p className="text-gray-300 text-base mb-8 max-w-lg leading-relaxed">
                        Hệ thống bán giày dép trực tuyến chuyên nghiệp. Mang đến trải nghiệm mua sắm nhanh chóng, tiện lợi và phong cách.
                    </p>

                    {/* 2 Nút chức năng to đùng dưới Footer */}
                    <div className="flex flex-wrap justify-center gap-6 mb-8">
                        <Link to="/lich-su-mua-hang" className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors border border-gray-700 hover:border-gray-500 flex items-center gap-2">
                            📋 Lịch sử mua hàng
                        </Link>
                        <Link to="/theo-doi-don-hang" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg flex items-center gap-2">
                            🔍 Theo dõi đơn hàng
                        </Link>
                    </div>

                    <p className="text-gray-500 text-sm font-medium">© 2026 Nesty. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default StorefrontLayout;