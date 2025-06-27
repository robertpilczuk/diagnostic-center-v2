import axios from "axios";

// Base axios conf
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add token to request
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Base errors handler
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("refresh");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default instance;
