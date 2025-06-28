import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const LabLayout = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 p-8 bg-gray-100 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default LabLayout;
