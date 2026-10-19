import axiosClient from "./axiosClient";

export const getMauSacs = () => axiosClient.get("/admin/mau-sac");
export const createMauSac = (data) => axiosClient.post("/admin/mau-sac", data);
export const updateMauSac = (id, data) => axiosClient.put(`/admin/mau-sac/${id}`, data);
export const deleteMauSac = (id) => axiosClient.delete(`/admin/mau-sac/${id}`);