import axiosClient from "./axiosClient";

export const getSanPhams = (search = "") =>
    axiosClient.get("/admin/san-pham", {
        params: { search }
    });

export const createSanPham = (data) =>
    axiosClient.post("/admin/san-pham", data);

export const updateSanPham = (id, data) =>
    axiosClient.put(`/admin/san-pham/${id}`, data);

export const deleteSanPham = (id) =>
    axiosClient.delete(`/admin/san-pham/${id}`);

export const getProducts = async (filters = {}) => {
    const params = {};

    if (filters.search) params.search = filters.search;
    if (filters.danhMucID) params.danhMucId = filters.danhMucID;
    if (filters.minPrice !== "") params.minPrice = filters.minPrice;
    if (filters.maxPrice !== "") params.maxPrice = filters.maxPrice;
    if (filters.kichThuocID) params.kichThuocId = filters.kichThuocID;
    if (filters.mauSacID) params.mauSacId = filters.mauSacID;

    const response = await axiosClient.get("/san-pham", { params });
    
    return response.data;
};

export const getProductDetail = async (id) => {
    const response = await axiosClient.get(`/san-pham/${id}`);
    return response.data;
};