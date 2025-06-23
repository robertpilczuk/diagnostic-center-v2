import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const LabLayout = () => {
    return (
        <div className="flex">
            <Sidebar role="lab" />
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default LabLayout;
