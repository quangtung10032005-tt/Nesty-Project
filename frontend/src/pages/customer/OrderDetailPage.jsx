import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetail } from "../../services/orderService";
import OrderStatus from "../../components/order/OrderStatus";

function OrderDetailPage() {
    const { donHangId } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const data = await getOrderDetail(donHangId);
                setOrder(data);
            } catch (err) {
                console.error(err);
                setError("Không thể tải chi tiết đơn hàng.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [donHangId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20 min-h-[60vh] bg-gray-50">
                <div className="flex flex-col items-center gap-3">
                    <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-500 font-medium">Đang tải thông tin đơn hàng...</p>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="flex flex-col justify-center items-center py-20 min-h-[60vh] bg-gray-50 px-4">
                <p className="text-red-500 font-medium text-lg mb-4">{error || "Không tìm thấy đơn hàng."}</p>
                <button
                    onClick={() => navigate("/lich-su-mua-hang")}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
                >
                    Quay lại lịch sử
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 min-h-screen">

            {/* Nút Quay lại */}
            <button
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium transition-colors mb-6"
                onClick={() => navigate("/lich-su-mua-hang")}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Quay lại lịch sử mua hàng
            </button>

            {/* Tiêu đề trang */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                <h1 className="text-3xl font-extrabold text-gray-900">Chi tiết đơn hàng</h1>
                <div className="text-gray-500 bg-white px-4 py-2 border border-gray-200 rounded-lg shadow-sm">
                    Mã đơn: <span className="font-bold text-gray-900">{order.maDonHang}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* CỘT TRÁI: DANH SÁCH SẢN PHẨM */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                            <h2 className="font-bold text-gray-900 text-lg">Sản phẩm đã đặt</h2>
                            <span className="text-sm font-medium text-gray-500">{order.items?.length || 0} sản phẩm</span>
                        </div>

                        <div className="p-6 divide-y divide-gray-100">
                            {order.items?.map((item, index) => (
                                <div key={index} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1 leading-tight">{item.tenSanPham}</h3>
                                        <div className="text-sm text-gray-500 flex items-center gap-3 mb-2">
                                            <span className="bg-gray-100 px-2 py-1 rounded-md">Size: <strong className="text-gray-700">{item.kichThuoc}</strong></span>
                                            <span className="bg-gray-100 px-2 py-1 rounded-md">Màu: <strong className="text-gray-700">{item.mauSac}</strong></span>
                                        </div>
                                        <p className="text-sm text-gray-500">Số lượng: <strong className="text-gray-900">{item.soLuong}</strong></p>
                                    </div>
                                    <div className="text-left sm:text-right flex flex-col justify-center">
                                        <p className="text-sm text-gray-500 mb-1 hidden sm:block">Thành tiền</p>
                                        <strong className="text-lg text-gray-900">
                                            {Number(item.thanhTien).toLocaleString("vi-VN")} đ
                                        </strong>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Tổng tiền */}
                        <div className="px-6 py-5 bg-gray-50 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="text-lg text-gray-700 font-medium">Tổng thanh toán:</span>
                                <span className="text-2xl font-extrabold text-red-600">
                                    {Number(order.tongTien).toLocaleString("vi-VN")} đ
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CỘT PHẢI: THÔNG TIN GIAO HÀNG & TRẠNG THÁI */}
                <div className="space-y-6">

                    {/* Trạng thái đơn hàng */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="font-bold text-gray-900 text-lg">Thông tin đơn hàng</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Ngày đặt hàng</p>
                                <p className="font-medium text-gray-900">{new Date(order.ngayDat).toLocaleString("vi-VN")}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Trạng thái hiện tại</p>
                                {/* Đảm bảo component OrderStatus cũng được style phù hợp, nếu không bạn có thể bọc nó trong 1 thẻ div */}
                                <div className="inline-block">
                                    <OrderStatus status={order.trangThaiDonHang} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Thông tin nhận hàng */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <h3 className="font-bold text-gray-900 text-lg">Thông tin nhận hàng</h3>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500 mb-0.5">Người nhận</p>
                                <p className="font-semibold text-gray-900">{order.hoTenNguoiNhan}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-0.5">Số điện thoại</p>
                                <p className="font-medium text-gray-900">{order.soDienThoaiNhan}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-0.5">Địa chỉ giao hàng</p>
                                <p className="text-gray-900 leading-relaxed">{order.diaChiNhan}</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default OrderDetailPage;