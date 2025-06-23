import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import axios from "../api/axios.ts";

import type { ReactNode } from "react"

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

    const logout = () => {
        setToken(null);
        setRefreshToken(null);
        setUser(null);
        localStorage.removeItem("token")
        localStorage.removeItem("refresh")
    };

    //Fetch user data when token changes
    useEffect(() => {
        if (token) {
            axios
                .get("/api/me/", {
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
            value={{ token, refreshToken, user, isAuthenticated, login, logout }}
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
