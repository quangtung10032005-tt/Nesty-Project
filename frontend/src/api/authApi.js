import axiosClient from "./axiosClient";

export const register = (data) => axiosClient.post("/Auth/register", data);
export const login = (data) => axiosClient.post("/Auth/login", data);
export const getProfile = () => axiosClient.get("/customer/profile");
export const updateProfile = (data) => axiosClient.put("/customer/profile", data);