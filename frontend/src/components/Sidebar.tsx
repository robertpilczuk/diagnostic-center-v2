import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    console.log("Sidebar rendered, user:", user);

    if (!user) {
        return <div className="w-64 p-4 text-gray-600">Loading sidebar...</div>;
    }

    let role = "";
    const links: { to: string; label: string }[] = [];

    if (user.is_patient) {
        role = "Patient";
        links.push(
            { to: "/patient/home", label: "Home" },
            { to: "/patient/tests", label: "My Tests" },
            { to: "/patient/reports", label: "Reports" },
            { to: "/patient/appointments", label: "Appointments" },
            { to: "/patient/prescriptions", label: "Prescriptions" },
        );
    } else if (user.is_doctor) {
        role = "Doctor";
        links.push(
            { to: "/doctor/home", label: "Home" },
            { to: "/doctor/patients", label: "Patients" },
            { to: "/doctor/reports", label: "Reports" },
            { to: "/doctor/appointments", label: "Appointments" },
            { to: "/doctor/prescriptions", label: "Prescriptions" },
        );
    } else if (user.is_laboratory) {
        role = "Laboratory";
        links.push(
            { to: "/lab/home", label: "Home" },
            { to: "/lab/tests", label: "Test Orders" },
        );
    } else {
        return (
            <div className="w-64 p-4 text-red-600">
                Unknown role for user: {user.username}
            </div>
        );
    }

    console.log("Sidebar detected role:", role);

    return (
        <div className="w-64 min-h-screen bg-blue-800 text-white p-4">
            <h2 className="text-xl font-bold mb-6">{role} Panel</h2>
            <ul className="space-y-2">
                {links.map(link => (
                    <li key={link.to}>
                        <Link to={link.to} className="block hover:underline">
                            {link.label}
                        </Link>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => {
                            logout();
                            navigate("/login");
                        }}
                        className="mt-4 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
