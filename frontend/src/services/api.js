import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7035/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// BỔ SUNG ĐOẠN NÀY: Tự động kẹp Token vào Header trước khi gọi API
api.interceptors.request.use(
    (config) => {
        // Kiểm tra đúng tên key lưu token lúc Login (ở đây tao ví dụ là "token")
        const token = localStorage.getItem("token"); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;