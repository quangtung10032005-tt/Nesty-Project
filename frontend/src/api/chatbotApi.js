import api from "../services/api";

export const sendMessageToBot = async (data) => await api.post("/chatbot/gui-tin-nhan", data);