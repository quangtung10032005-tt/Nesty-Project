import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCart, updateCartItem, removeCartItem } from "../../api/gioHangApi";

function CartPage() {
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCart = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await getCart();
                setCart(data);
            } catch (error) {
                console.error(error);
                setError("Không thể tải giỏ hàng.");
            } finally {
                setLoading(false);
            }
        };
        loadCart();
    }, []);

    const handleUpdateQuantity = async (item, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            const data = await updateCartItem(item.chiTietGioHangID, newQuantity);
            setCart(data);
        } catch (error) {
            console.error(error);
            alert("Không thể cập nhật số lượng.");
        }
    };

    const handleRemove = async (chiTietGioHangID) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) return;
        try {
            const data = await removeCartItem(chiTietGioHangID);
            setCart(data);
        } catch (error) {
            console.error(error);
            alert("Không thể xóa sản phẩm.");
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center py-20 min-h-[60vh]">
            <p className="text-gray-500 text-lg font-medium">Đang tải giỏ hàng...</p>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center py-20 min-h-[60vh]">
            <p className="text-red-500 text-lg font-medium">{error}</p>
        </div>
    );

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Giỏ hàng của bạn đang trống</h1>
                <p className="text-gray-500 mb-8">Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
                <Link to="/products" className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition shadow-md">
                    Tiếp tục mua sắm
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Giỏ hàng của bạn</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* CỘT TRÁI: DANH SÁCH SẢN PHẨM */}
                <div className="w-full lg:w-2/3 space-y-4">
                    {cart.items.map(item => (
                        <div key={item.chiTietGioHangID} className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center relative transition hover:shadow-md">

                            {/* Nút Xóa (Góc trên phải ở mobile, thẳng hàng ở Desktop) */}
                            <button
                                onClick={() => handleRemove(item.chiTietGioHangID)}
                                className="absolute top-4 right-4 sm:static sm:order-last text-gray-400 hover:text-red-500 transition-colors p-2"
                                title="Xóa sản phẩm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>

                            {/* Hình ảnh */}
                            <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
                                {item.duongDanAnh ? (
                                    <img src={item.duongDanAnh} alt={item.tenSanPham} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No image</div>
                                )}
                            </div>

                            {/* Thông tin */}
                            <div className="flex-1 flex flex-col justify-between h-full w-full">
                                <div>
                                    <Link to={`/products/${item.sanPhamID}`} className="text-lg font-bold text-gray-900 hover:text-blue-600 line-clamp-2 transition-colors pr-8 sm:pr-0">
                                        {item.tenSanPham}
                                    </Link>
                                    <div className="mt-1 text-sm text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
                                        <p>Size: <span className="font-medium text-gray-800">{item.tenKichThuoc}</span></p>
                                        <p>Màu: <span className="font-medium text-gray-800">{item.tenMau}</span></p>
                                        <p className="hidden sm:block">SKU: {item.sku}</p>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Đơn giá: <span className="font-medium text-gray-800">{item.donGia.toLocaleString("vi-VN")}đ</span>
                                    </p>
                                </div>

                                {/* Tương tác: Số lượng & Tổng tiền con */}
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center border border-gray-300 rounded-lg bg-white h-9">
                                        <button
                                            onClick={() => handleUpdateQuantity(item, item.soLuong - 1)}
                                            disabled={item.soLuong <= 1}
                                            className="w-8 h-full flex items-center justify-center text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-10 text-center font-medium text-gray-900 text-sm border-x border-gray-200">
                                            {item.soLuong}
                                        </span>
                                        <button
                                            onClick={() => handleUpdateQuantity(item, item.soLuong + 1)}
                                            className="w-8 h-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="text-right sm:hidden">
                                        <p className="font-bold text-red-600">{item.thanhTien.toLocaleString("vi-VN")}đ</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tổng tiền con (Hiển thị ở Desktop) */}
                            <div className="hidden sm:block text-right min-w-[120px]">
                                <p className="text-sm text-gray-500 mb-1">Thành tiền</p>
                                <p className="text-lg font-bold text-red-600">{item.thanhTien.toLocaleString("vi-VN")}đ</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
                <div className="w-full lg:w-1/3">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>

                        <div className="space-y-4 text-gray-600 mb-6">
                            <div className="flex justify-between">
                                <span>Tổng số lượng:</span>
                                <span className="font-medium text-gray-900">{cart.tongSoLuong} sản phẩm</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tạm tính:</span>
                                <span className="font-medium text-gray-900">{cart.tongTien.toLocaleString("vi-VN")}đ</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mb-6">
                            <div className="flex justify-between items-end">
                                <span className="text-lg font-bold text-gray-900">Tổng tiền:</span>
                                <span className="text-2xl font-extrabold text-red-600">
                                    {cart.tongTien.toLocaleString("vi-VN")}đ
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 text-right mt-1">(Chưa bao gồm phí vận chuyển)</p>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg active:scale-95 flex justify-center items-center gap-2"
                        >
                            Tiến hành thanh toán
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;