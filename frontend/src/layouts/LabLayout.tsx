// import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LabLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="flex h-screen">
            <aside className="w-64 bg-purple-900 text-white p-4">
                <h2 className="text-2xl font-bold mb-6">Lab Panel</h2>
                <nav className="space-y-2">
                    <button onClick={() => navigate("/lab")} className="block w-full text-left hover:underline">
                        Home
                    </button>
                    <button onClick={logout} className="block w-full text-left text-red-300 mt-6 hover:underline">
                        Logout
                    </button>
                </nav>
            </aside>
            <main className="flex-1 p-8 bg-gray-100 overflow-auto">
                <Outlet />
            </main>
            {/* <Sidebar role="lab" /> */}
            {/* <div className="flex-1 p-6"> */}
            {/* </div> */}
        </div>
    );
};

export default LabLayout;
