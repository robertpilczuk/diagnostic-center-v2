import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DoctorLayout = () => {
    return (
        <div className="flex">
            <Sidebar role="doctor" />
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    )

};

export default DoctorLayout;