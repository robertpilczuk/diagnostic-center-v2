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

    const login = (access: string, refresh: string) => {
        setToken(access);
        setRefreshToken(refresh);
        localStorage.setItem("token", access);
        localStorage.setItem("refresh", refresh);
    };

    const navigate = useNavigate();

    const logout = () => {
        setToken(null);
        setRefreshToken(null);
        setUser(null);
        localStorage.removeItem("token")
        localStorage.removeItem("refresh")
    };

    const loginUser = async (username: string, password: string) => {
        try {
            const response = await axios.post("/api/token/", {
                username,
                password,
            });

            const { access, refresh } = response.data;
            login(access, refresh);

            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid credentials");
        }

    }

    //Fetch user data when token changes
    useEffect(() => {
        if (token) {
            axios
                .get("/me/", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => setUser(res.data))
                .catch(() => logout());
        }
    }, [token]);

    //Refresh token every 5 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            if (refreshToken) {
                axios
                    .post("/api/token/refresh/", { refresh: refreshToken })
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
            value={{ token, refreshToken, user, isAuthenticated, login, logout, loginUser, }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
