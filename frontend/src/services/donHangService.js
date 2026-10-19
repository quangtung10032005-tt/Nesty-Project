import axios from 'axios';

const API_URL = 'https://localhost:7035/api'; // Đổi lại port nếu cấu hình của bạn khác

export const getCheckout = async (token) => {
    return await axios.get(`${API_URL}/don-hang/checkout`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const createOrder = async (orderData, token) => {
    return await axios.post(`${API_URL}/don-hang`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const processPayment = async (donHangId, paymentData, token) => {
    return await axios.post(`${API_URL}/thanh-toan/${donHangId}`, paymentData, {
        headers: { Authorization: `Bearer ${token}` }
    });
};