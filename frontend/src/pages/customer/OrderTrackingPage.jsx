import { useState } from "react";
import { getOrderTracking } from "../../services/orderService";

function OrderTrackingPage() {
    const [maDonHang, setMaDonHang] = useState("");
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!maDonHang.trim()) {
            setError("Vui lòng nhập mã đơn hàng.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setOrder(null);

            const data = await getOrderTracking(maDonHang.trim());
            setOrder(data);
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message ||
                "Không tìm thấy đơn hàng. Vui lòng kiểm tra lại mã."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[70vh]">
            <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Theo dõi đơn hàng</h1>
                <p className="text-gray-500 max-w-lg mx-auto">
                    Nhập mã đơn hàng của bạn vào ô bên dưới để kiểm tra tình trạng xử lý và tiến độ giao hàng.
                </p>
            </div>

            {/* Thanh Tìm Kiếm */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 mb-12">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Ví dụ: DH20261018210304571"
                        value={maDonHang}
                        onChange={(e) => setMaDonHang(e.target.value)}
                        className="w-full pl-11 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm text-gray-900 font-medium"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`px-8 py-4 rounded-xl font-bold text-white transition-all shadow-md sm:w-auto w-full flex justify-center items-center gap-2
                        ${loading ? 'bg-gray-400 cursor-not-allowed shadow-none' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95'}`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Đang tìm...
                        </>
                    ) : "Tra cứu"}
                </button>
            </form>

            {/* Thông báo lỗi */}
            {error && (
                <div className="max-w-2xl mx-auto mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3">
                    <svg className="h-6 w-6 text-red-500 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-red-700 font-medium">{error}</p>
                </div>
            )}

            {/* Thẻ hiển thị kết quả */}
            {order && (
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in-up">

                    {/* Header Thẻ */}
                    <div className="bg-gray-50 border-b border-gray-100 px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Mã đơn hàng</p>
                            <h2 className="text-xl font-bold text-gray-900">{order.maDonHang}</h2>
                        </div>
                        <div className="text-left sm:text-right">
                            <p className="text-sm text-gray-500 mb-1">Ngày đặt hàng</p>
                            <p className="font-medium text-gray-900">{new Date(order.ngayDat).toLocaleString("vi-VN")}</p>
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Cột 1: Thông tin chung */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4 border-b pb-2">
                                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        Tổng quan đơn hàng
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Trạng thái xử lý</p>
                                            <span className="inline-block mt-1 px-3 py-1 bg-blue-50 text-blue-700 font-semibold rounded-full text-sm border border-blue-100">
                                                {order.trangThaiDonHang}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Tổng tiền thanh toán</p>
                                            <p className="text-xl font-extrabold text-red-600">
                                                {Number(order.tongTien).toLocaleString("vi-VN")} đ
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cột 2: Giao hàng */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4 border-b pb-2">
                                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                        </svg>
                                        Thông tin vận chuyển
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                                            <span className="text-sm text-gray-500">Trạng thái:</span>
                                            <span className="font-medium text-gray-900">{order.trangThaiGiaoHang || "Chưa cập nhật"}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                                            <span className="text-sm text-gray-500">Đơn vị VC:</span>
                                            <span className="font-medium text-gray-900">{order.donViVanChuyen || "Chưa cập nhật"}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                                            <span className="text-sm text-gray-500">Mã vận đơn:</span>
                                            <span className="font-medium text-gray-900">{order.maVanDon || "Chưa có"}</span>
                                        </div>

                                        {/* Các mốc thời gian */}
                                        {order.ngayGiao && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Ngày giao:</span>
                                                <span className="font-medium text-gray-900">{new Date(order.ngayGiao).toLocaleString("vi-VN")}</span>
                                            </div>
                                        )}
                                        {order.ngayDuKien && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Dự kiến nhận:</span>
                                                <span className="font-medium text-gray-900">{new Date(order.ngayDuKien).toLocaleString("vi-VN")}</span>
                                            </div>
                                        )}
                                        {order.ngayNhan && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-green-600 font-medium">Đã nhận lúc:</span>
                                                <span className="font-bold text-green-600">{new Date(order.ngayNhan).toLocaleString("vi-VN")}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderTrackingPage;