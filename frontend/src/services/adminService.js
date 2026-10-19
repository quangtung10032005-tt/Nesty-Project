import api from "../api/axiosClient"; // Trỏ đúng về file chứa cấu hình kẹp JWT

// --- ĐƠN HÀNG ADMIN ---
export const getAdminOrders = async () => {
    const response = await api.get("/admin/don-hang");
    return response.data;
};

export const getAdminOrderDetail = async (id) => {
    const response = await api.get(`/admin/don-hang/${id}`);
    return response.data;
};

export const updateOrderStatus = async (id, status) => {
    const response = await api.put(`/admin/don-hang/${id}/trang-thai`, { trangThai: status });
    return response.data;
};

// --- KHÁCH HÀNG ADMIN ---
export const getAdminCustomers = async () => {
    const response = await api.get("/admin/khach-hang");
    return response.data;
};

export const getAdminCustomerDetail = async (id) => {
    const response = await api.get(`/admin/khach-hang/${id}`);
    return response.data;
};