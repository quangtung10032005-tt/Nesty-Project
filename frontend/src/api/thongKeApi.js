import api from "../services/api";

export const getTongQuanThongKe = async () => await api.get("/admin/thong-ke/tong-quan");