import axiosClient from "./axiosClient";

const API_URL = "https://localhost:7035/api/gio-hang";

export const getCart = async () => {
    const response = await axiosClient.get(API_URL);
    return response.data;
};

export const addToCart = async (bienTheID, soLuong) => {
    const response = await axiosClient.post(`${API_URL}/items`, {
        bienTheID,
        soLuong
    });
    return response.data;
};

export const updateCartItem = async (chiTietGioHangID, soLuong) => {
    const response = await axiosClient.put(`${API_URL}/items/${chiTietGioHangID}`, {
        soLuong
    });
    return response.data;
};

export const removeCartItem = async (chiTietGioHangID) => {
    const response = await axiosClient.delete(`${API_URL}/items/${chiTietGioHangID}`);
    return response.data;
};