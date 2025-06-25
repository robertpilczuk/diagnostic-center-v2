import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const DoctorLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-900 text-white p-4">
                <h2 className="text-2xl font-bold mb-6">Doctor Panel</h2>
                <nav className="space-y-2">
                    <button
                        onClick={() => navigate("/doctor")}
                        className="block w-full text-left hover:underline"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => navigate("/doctor/reports")}
                        className="block w-full text-left hover:underline"
                    >
                        Reports
                    </button>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left text-red-300 mt-6 hover:underline"
                    >
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8 bg-gray-100 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default DoctorLayout;
