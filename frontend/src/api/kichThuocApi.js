import axiosClient from "./axiosClient";

export const getKichThuocs = () => axiosClient.get("/admin/kich-thuoc");
export const createKichThuoc = (data) => axiosClient.post("/admin/kich-thuoc", data);
export const updateKichThuoc = (id, data) => axiosClient.put(`/admin/kich-thuoc/${id}`, data);
export const deleteKichThuoc = (id) => axiosClient.delete(`/admin/kich-thuoc/${id}`);