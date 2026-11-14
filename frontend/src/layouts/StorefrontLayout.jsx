import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ChatbotWidget from "../components/client/ChatbotWidget";

function StorefrontLayout() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
            {/* 1. Top Announcement Bar */}
            <div className="bg-slate-900 text-slate-200 text-xs sm:text-sm py-2 px-4 text-center font-medium tracking-wide">
                🚚 Miễn phí vận chuyển toàn quốc cho đơn hàng từ <span className="text-sky-400 font-bold">500.000đ</span> — Đổi trả miễn phí trong 30 ngày
            </div>

            {/* 2. Header / Navbar */}
            <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20 gap-4">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-3xl sm:text-4xl font-black text-blue-600 tracking-tighter">
                                NESTY
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <nav className="hidden lg:flex items-center space-x-7">
                            <Link to="/" className="text-slate-700 hover:text-blue-600 font-semibold text-base transition-colors">
                                Trang chủ
                            </Link>
                            <Link to="/products" className="text-slate-700 hover:text-blue-600 font-semibold text-base transition-colors">
                                Sản phẩm
                            </Link>
                            <Link to="/theo-doi-don-hang" className="text-slate-700 hover:text-blue-600 font-semibold text-base transition-colors">
                                Theo dõi đơn
                            </Link>
                            <Link to="/lich-su-mua-hang" className="text-slate-700 hover:text-blue-600 font-semibold text-base transition-colors">
                                Lịch sử mua
                            </Link>
                        </nav>

                        {/* Thanh tìm kiếm nhanh */}
                        <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xs mx-2">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Tìm mẫu giày, thương hiệu..."
                                    className="w-full bg-slate-100 text-sm text-slate-800 placeholder-slate-400 rounded-full pl-4 pr-10 py-2 border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                                    title="Tìm kiếm"
                                >
                                    🔍
                                </button>
                            </div>
                        </form>

                        {/* Right side actions */}
                        <div className="flex items-center space-x-3 sm:space-x-5">
                            <Link
                                to="/cart"
                                className="relative flex items-center gap-1.5 text-slate-700 hover:text-blue-600 font-semibold text-sm sm:text-base px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                                <span>🛒</span>
                                <span className="hidden sm:inline">Giỏ hàng</span>
                            </Link>

                            <div className="h-6 w-px bg-slate-200"></div>

                            <Link
                                to="/profile"
                                className="text-slate-700 hover:text-blue-600 font-semibold text-sm sm:text-base transition-colors"
                            >
                                Tài khoản
                            </Link>

                            <Link
                                to="/login"
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                            >
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

            {/* 3. Footer 4 cột chuyên nghiệp */}
            <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 mt-auto border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
                        {/* Cột 1: Giới thiệu thương hiệu */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-black text-white tracking-tight">
                                NESTY <span className="text-blue-500">SHOES</span>
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Hệ thống phân phối giày dép chính hãng trực tuyến. Cam kết chất lượng chuẩn xác, giao hàng siêu tốc và trải nghiệm mua sắm tận tâm.
                            </p>
                            <div className="flex items-center gap-3 pt-1 text-xs font-semibold text-slate-400">
                                <span className="bg-slate-800 px-3 py-1.5 rounded-md border border-slate-700">✓ Chính hãng 100%</span>
                                <span className="bg-slate-800 px-3 py-1.5 rounded-md border border-slate-700">↺ Đổi size 30 ngày</span>
                            </div>
                        </div>

                        {/* Cột 2: Khám phá */}
                        <div>
                            <h4 className="text-white font-bold uppercase text-sm tracking-wider mb-4">Khám phá</h4>
                            <ul className="space-y-2.5 text-sm">
                                <li><Link to="/" className="hover:text-blue-400 transition-colors">Trang chủ</Link></li>
                                <li><Link to="/products" className="hover:text-blue-400 transition-colors">Tất cả sản phẩm</Link></li>
                                <li><Link to="/cart" className="hover:text-blue-400 transition-colors">Giỏ hàng của bạn</Link></li>
                                <li><Link to="/profile" className="hover:text-blue-400 transition-colors">Thông tin tài khoản</Link></li>
                            </ul>
                        </div>

                        {/* Cột 3: Tiện ích khách hàng */}
                        <div>
                            <h4 className="text-white font-bold uppercase text-sm tracking-wider mb-4">Tiện ích đơn hàng</h4>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link
                                        to="/theo-doi-don-hang"
                                        className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 font-semibold transition-colors"
                                    >
                                        🔍 Tra cứu & Theo dõi đơn hàng
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/lich-su-mua-hang"
                                        className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-semibold transition-colors"
                                    >
                                        📋 Lịch sử mua hàng
                                    </Link>
                                </li>
                                <li className="text-slate-400 pt-1">Hotline hỗ trợ: <span className="text-white font-semibold">1900 6868</span></li>
                                <li className="text-slate-400">Giờ làm việc: 08:00 - 22:00 hàng ngày</li>
                            </ul>
                        </div>

                        {/* Cột 4: Nhận thông tin khuyến mãi */}
                        <div>
                            <h4 className="text-white font-bold uppercase text-sm tracking-wider mb-4">Nhận ưu đãi mới</h4>
                            <p className="text-slate-400 text-sm mb-4">
                                Đăng ký email để nhận thông báo sớm nhất về các bộ sưu tập mới và voucher giảm giá độc quyền.
                            </p>
                            <form onSubmit={(e) => { e.preventDefault(); alert("Cảm ơn bạn đã đăng ký nhận tin từ Nesty!"); }} className="flex gap-2">
                                <input
                                    type="email"
                                    required
                                    placeholder="Email của bạn..."
                                    className="w-full bg-slate-800 text-white text-sm px-3.5 py-2.5 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                                >
                                    Gửi
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Bottom Copyright */}
                    <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
                        <p>© 2026 Nesty Shoes. All rights reserved.</p>
                        <div className="flex gap-6">
                            <span className="hover:text-slate-300 cursor-pointer">Điều khoản dịch vụ</span>
                            <span className="hover:text-slate-300 cursor-pointer">Chính sách bảo mật</span>
                            <span className="hover:text-slate-300 cursor-pointer">Chính sách đổi trả</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default StorefrontLayout;