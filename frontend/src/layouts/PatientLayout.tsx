import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const PatientLayout = () => {
    return (
        <div className="flex h-screen">
            <Sidebar role="patient" />
            <main className="flex-1 p-8 bg-gray-100 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default PatientLayout;
