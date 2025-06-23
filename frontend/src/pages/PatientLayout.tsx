import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const PatientLayout = () => {
    return (
        <div className="flex">
            <Sidebar role="patient" />
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default PatientLayout;