import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getCheckout,
    createOrder,
    processPayment
} from '../../services/donHangService';

const Checkout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [cartData, setCartData] = useState(null);

    const [formData, setFormData] = useState({
        hoTenNguoiNhan: '',
        soDienThoaiNhan: '',
        tinhThanhNhan: '',
        quanHuyenNhan: '',
        phuongXaNhan: '',
        diaChiNhan: '',
        ghiChu: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await getCheckout(token);
                setCartData(response.data);
            } catch (error) {
                alert('Giỏ hàng trống hoặc có lỗi xảy ra!');
                navigate('/cart');
            }
        };

        fetchCart();
    }, [token, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            // 1. Tạo đơn hàng
            const orderRes = await createOrder(formData, token);
            const donHangId = orderRes.data.donHangID;

            // 2. Thanh toán COD
            await processPayment(
                donHangId,
                { phuongThucThanhToan: 'COD' },
                token
            );

            // 3. Chuyển sang trang đặt hàng thành công
            navigate('/dat-hang-thanh-cong', {
                state: {
                    donHangId: donHangId,
                    maDonHang: orderRes.data.maDonHang,
                    tongTien: orderRes.data.tongTien
                }
            });

        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Lỗi đặt hàng'
            );
            setIsSubmitting(false);
        }
    };

    if (!cartData) {
        return (
            <div className="flex justify-center items-center py-20 min-h-[60vh]">
                <p className="text-gray-500 text-lg font-medium">Đang tải dữ liệu thanh toán...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Thanh toán</h1>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* CỘT TRÁI: THÔNG TIN GIAO HÀNG */}
                <div className="w-full lg:w-2/3">
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Thông tin giao hàng</h2>

                        <form onSubmit={handleCheckout} className="space-y-5">

                            {/* Họ tên & Số điện thoại */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên người nhận <span className="text-red-500">*</span></label>
                                    <input
                                        name="hoTenNguoiNhan"
                                        placeholder="Nhập họ tên"
                                        value={formData.hoTenNguoiNhan}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                                    <input
                                        name="soDienThoaiNhan"
                                        placeholder="Nhập số điện thoại"
                                        value={formData.soDienThoaiNhan}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    />
                                </div>
                            </div>

                            {/* Tỉnh/Thành, Quận/Huyện, Phường/Xã */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành <span className="text-red-500">*</span></label>
                                    <input
                                        name="tinhThanhNhan"
                                        placeholder="VD: Hà Nội"
                                        value={formData.tinhThanhNhan}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện <span className="text-red-500">*</span></label>
                                    <input
                                        name="quanHuyenNhan"
                                        placeholder="VD: Cầu Giấy"
                                        value={formData.quanHuyenNhan}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phường/Xã <span className="text-red-500">*</span></label>
                                    <input
                                        name="phuongXaNhan"
                                        placeholder="VD: Dịch Vọng"
                                        value={formData.phuongXaNhan}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    />
                                </div>
                            </div>

                            {/* Địa chỉ cụ thể */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ cụ thể <span className="text-red-500">*</span></label>
                                <input
                                    name="diaChiNhan"
                                    placeholder="Số nhà, tên đường, ngõ/ngách..."
                                    value={formData.diaChiNhan}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            {/* Ghi chú */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú (Tùy chọn)</label>
                                <textarea
                                    name="ghiChu"
                                    placeholder="Ghi chú thêm về đơn hàng hoặc thời gian nhận hàng..."
                                    value={formData.ghiChu}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full mt-6 py-4 rounded-xl font-bold text-lg text-white transition-all shadow-md flex justify-center items-center gap-2 
                                    ${isSubmitting ? 'bg-gray-400 cursor-not-allowed shadow-none' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5'}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang xử lý...
                                    </>
                                ) : (
                                    'ĐẶT HÀNG (Thanh toán khi nhận hàng)'
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* CỘT PHẢI: THÔNG TIN ĐƠN HÀNG */}
                <div className="w-full lg:w-1/3">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Đơn hàng của bạn</h2>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {cartData.items.map((item, index) => (
                                <div key={index} className="flex flex-col gap-2 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                    <div className="flex justify-between items-start gap-4">
                                        <p className="font-semibold text-gray-900 flex-1 line-clamp-2">{item.tenSanPham}</p>
                                        <p className="font-bold text-gray-900 whitespace-nowrap">{item.thanhTien?.toLocaleString("vi-VN")}đ</p>
                                    </div>
                                    <div className="text-sm text-gray-500 flex flex-wrap gap-x-3">
                                        <span>Size: {item.tenKichThuoc}</span>
                                        <span>•</span>
                                        <span>Màu: {item.tenMau}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        SL: <span className="font-medium">{item.soLuong}</span> x {item.donGia?.toLocaleString("vi-VN")}đ
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Tổng số lượng:</span>
                                <span className="font-medium text-gray-900">{cartData.tongSoLuong} sản phẩm</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Phí vận chuyển:</span>
                                <span className="font-medium text-green-600">Miễn phí</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-end">
                            <span className="text-lg font-bold text-gray-900">Tổng thanh toán:</span>
                            <span className="text-2xl font-extrabold text-red-600">
                                {cartData.tongTien?.toLocaleString("vi-VN")}đ
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;