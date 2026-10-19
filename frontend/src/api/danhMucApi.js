import axiosClient from "./axiosClient";

export const getDanhMucs = () => axiosClient.get("/admin/danh-muc");
export const getDanhMucById = (id) => axiosClient.get(`/admin/danh-muc/${id}`);
export const createDanhMuc = (data) => axiosClient.post("/admin/danh-muc", data);
export const updateDanhMuc = (id, data) => axiosClient.put(`/admin/danh-muc/${id}`, data);
export const deleteDanhMuc = (id) => axiosClient.delete(`/admin/danh-muc/${id}`);