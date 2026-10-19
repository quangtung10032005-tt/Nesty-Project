import api from "../services/api";

export const getTonKho = async (khoId = "") => {
    const url = khoId ? `/admin/kho/ton-kho?khoId=${khoId}` : "/admin/kho/ton-kho";
    return await api.get(url);
};

export const createPhieuNhapKho = async (data) => {
    return await api.post("/admin/kho/nhap-kho", data);
};