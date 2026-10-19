import axiosClient from "./axiosClient";

export const getBienThes = (sanPhamId) =>
    axiosClient.get(`/admin/san-pham/${sanPhamId}/bien-the`);

export const createBienThe = (data) =>
    axiosClient.post("/admin/bien-the", data);

export const updateBienThe = (id, data) =>
    axiosClient.put(`/admin/bien-the/${id}`, data);

export const deleteBienThe = (id) =>
    axiosClient.delete(`/admin/bien-the/${id}`);