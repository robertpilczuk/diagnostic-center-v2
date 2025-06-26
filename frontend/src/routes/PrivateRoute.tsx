import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;