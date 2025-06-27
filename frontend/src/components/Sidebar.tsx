import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface SidebarProps {
    role: "doctor" | "patient" | "lab";
}

const Sidebar = ({ role }: SidebarProps) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const commonLinks = [
        { to: `/${role}`, label: "Home" },
        { to: `/${role}/reports`, label: "Reports" },
        { to: `/${role}/appointments`, label: "Appointments" },
        { to: `/${role}/prescriptions`, label: "Prescriptions" },
        ...(role === "patient"
            ? [{ to: `/${role}/tests`, label: "My Tests" }]
            : []),
    ];

    return (
        <div className="w-64 min-h-screen bg-blue-800 text-white p-4">
            <h2 className="text-xl font-bold mb-6 capitalize">{role} panel</h2>
            <ul className="space-y-2">
                {commonLinks.map((link) => (
                    <li key={link.to}>
                        <Link to={link.to} className="block hover:underline">
                            {link.label}
                        </Link>
                    </li>
                ))}
                <li>
                    <button
                        onClick={handleLogout}
                        className="mt-4 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );

};

export default Sidebar