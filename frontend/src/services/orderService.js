import api from "../api/axiosClient";

// Theo dõi đơn hàng
export const getOrderTracking = async (maDonHang) => {
    const response = await api.get(
        `/don-hang/theo-doi/${encodeURIComponent(maDonHang)}`
    );

    return response.data;
};

// Lịch sử mua hàng
export const getOrderHistory = async () => {
    const response = await api.get("/don-hang/lich-su");

    return response.data;
};

// Chi tiết đơn hàng
export const getOrderDetail = async (donHangId) => {
    const response = await api.get(`/don-hang/${donHangId}`);

    return response.data;
};