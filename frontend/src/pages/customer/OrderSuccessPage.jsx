import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        donHangId,
        maDonHang,
        tongTien
    } = location.state || {};

    return (
        <div className="min-h-[70vh] flex items-center justify-center py-10 px-4 sm:px-6">
            <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

                {/* Phần Header & Icon thành công */}
                <div className="bg-green-50 px-6 py-10 text-center border-b border-green-100">
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                        <svg className="h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-green-600 mb-2">
                        Đặt hàng thành công!
                    </h1>
                    <p className="text-green-700 font-medium">
                        Cảm ơn bạn đã tin tưởng và mua sắm tại Nesty.
                    </p>
                </div>

                {/* Phần Thông tin đơn hàng (Biên lai) */}
                <div className="p-6 sm:p-8">
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4 mb-8">
                        {maDonHang && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Mã đơn hàng:</span>
                                <span className="font-bold text-gray-900 tracking-wide">{maDonHang}</span>
                            </div>
                        )}

                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 font-medium">Phương thức thanh toán:</span>
                            <span className="font-semibold text-gray-900">COD (Thanh toán khi nhận hàng)</span>
                        </div>

                        {tongTien !== undefined && (
                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <span className="text-gray-700 font-bold">Tổng thanh toán:</span>
                                <span className="font-extrabold text-red-600 text-xl">
                                    {Number(tongTien).toLocaleString('vi-VN')}đ
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Các nút hành động (Phân cấp chính - phụ) */}
                    <div className="space-y-3">
                        {/* Nút hành động chính */}
                        <button
                            onClick={() => navigate('/products')}
                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg active:scale-95"
                        >
                            Tiếp tục mua sắm
                        </button>

                        {/* Nút hành động phụ */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            {donHangId && (
                                <button
                                    onClick={() => navigate(`/don-hang/${donHangId}`)}
                                    className="w-full bg-white text-gray-700 border-2 border-gray-200 font-semibold py-3 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-colors"
                                >
                                    Xem chi tiết đơn
                                </button>
                            )}
                            <button
                                onClick={() => navigate('/theo-doi-don-hang')}
                                className="w-full bg-white text-gray-700 border-2 border-gray-200 font-semibold py-3 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-colors"
                            >
                                Theo dõi đơn hàng
                            </button>
                        </div>

                        {/* Nút text chìm */}
                        <div className="text-center pt-2">
                            <button
                                onClick={() => navigate('/lich-su-mua-hang')}
                                className="text-gray-500 hover:text-blue-600 font-medium underline-offset-4 hover:underline transition-colors"
                            >
                                Xem lịch sử mua hàng
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderSuccessPage;