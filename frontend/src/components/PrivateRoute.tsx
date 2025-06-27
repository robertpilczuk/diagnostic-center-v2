import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface PrivateRouteProps {
    children: ReactNode;
    allowedRoles?: string[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
