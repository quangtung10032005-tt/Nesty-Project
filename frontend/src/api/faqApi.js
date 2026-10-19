import api from "../services/api";

export const getFaqs = async () => await api.get("/admin/faq");
export const createFaq = async (data) => await api.post("/admin/faq", data);
export const updateFaq = async (id, data) => await api.put(`/admin/faq/${id}`, data);
export const deleteFaq = async (id) => await api.delete(`/admin/faq/${id}`);