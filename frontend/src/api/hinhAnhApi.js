import axiosClient from "./axiosClient";

export const getHinhAnhs = (sanPhamId) =>
    axiosClient.get(`/admin/san-pham/${sanPhamId}/hinh-anh`);

export const createHinhAnh = (data) =>
    axiosClient.post("/admin/hinh-anh", data);

export const updateHinhAnh = (id, data) =>
    axiosClient.put(`/admin/hinh-anh/${id}`, data);

export const deleteHinhAnh = (id) =>
    axiosClient.delete(`/admin/hinh-anh/${id}`);