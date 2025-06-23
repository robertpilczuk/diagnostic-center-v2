import axios from "axios";
import { useAuth } from "../contexts/AuthContext"

// Base axios conf
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

//base errors handler
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