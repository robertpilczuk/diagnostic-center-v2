import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import axios from "../api/axios.ts";
import type { ReactNode } from "react"
import { useNavigate } from "react-router-dom";

interface User {
    username: string;
    role: "Doctor" | "Laboratory" | "Patient";
    is_patient?: boolean;
    is_doctor?: boolean;
    is_laboratory?: boolean;
}

interface AuthContextType {
    token: string | null;
    refreshToken: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (access: string, refresh: string) => void;
    logout: () => void;
    loginUser: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem("token") || null
    );
    const [refreshToken, setRefreshToken] = useState<string | null>(
        () => localStorage.getItem("refresh") || null
    );
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!token;
    const navigate = useNavigate();

    const login = (access: string, refresh: string) => {
        setToken(access);
        setRefreshToken(refresh);
        localStorage.setItem("token", access);
        localStorage.setItem("refresh", refresh);
    };

    const logout = () => {
        setToken(null);
        setRefreshToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        navigate("/login");
    };

    const loginUser = async (username: string, password: string) => {
        try {
            const response = await axios.post("/token/", { username, password });
            const { access, refresh } = response.data;

            login(access, refresh);

            const userRes = await axios.get("/me/");
            const userData = userRes.data;
            setUser(userData);

            if (userData.is_patient) {
                navigate("/patient/home");
            } else if (userData.is_doctor) {
                navigate("/doctor/home");
            } else if (userData.is_laboratory) {
                navigate("/lab/home");
            } else {
                navigate("/");
            }
        } catch (error: any) {
            console.error("❌ Login failed:", error);
            alert("Login failed: " + (error.response?.data?.detail || "Unknown error"));
        }
    };

    useEffect(() => {
        console.log("AuthContext mounted: token =", token);

        if (token) {
            console.log("Fetching /me/");

            axios
                .get("/me/")
                .then((res) => {
                    console.log("✔ /me/ response:", res.data);
                    setUser(res.data);
                })
                .catch((err) => {
                    console.error("❌ /me/ failed", err);
                    logout()
                });
        } else {
            console.log("No token, user = null");
            setUser(null);
        }
    }, [token]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (refreshToken) {
                axios
                    .post("/token/refresh/", { refresh: refreshToken })
                    .then((res) => {
                        setToken(res.data.access);
                        localStorage.setItem("token", res.data.access);
                    })
                    .catch(() => logout());
            }
        }, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [refreshToken]);

    return (
        <AuthContext.Provider
            value={{ token, refreshToken, user, isAuthenticated, login, logout, loginUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export { useAuth };
