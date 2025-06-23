import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RoleRouter = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        switch (user.role) {
            case "Doctor":
                navigate("/doctor");
                break;
            case "Laboratory":
                navigate("lab");
                break;
            case "Patient":
                navigate("/patient");
                break;
            default:
                navigate("/login");
        }
    }, [user, navigate]);

    return null;
};

export default RoleRouter;