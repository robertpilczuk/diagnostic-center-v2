import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PatientHome = () => {
    const { user } = useAuth();

    if (!user) return <div className="p-8 text-blue-600">Loading...</div>;

    if (!user.is_patient) {
        return <Navigate to="/" />;
    }

    // Mockowane statystyki pacjenta
    const stats = [
        { label: "Upcoming Appointments", value: 2 },
        { label: "Test Results", value: 5 },
        { label: "Prescriptions", value: 3 },
    ];

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Welcome, {user.username}
            </h1>

            <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Quick overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((item, idx) => (
                    <div
                        key={idx}
                        className="p-6 rounded-xl bg-white shadow border text-center"
                    >
                        <div className="text-2xl font-bold text-blue-700">{item.value}</div>
                        <div className="text-sm text-gray-600 mt-1">{item.label}</div>
                    </div>
                ))}
            </div>

            {/* Linki do podstron (opcjonalne) */}
            <div className="mt-8 space-x-4">
                <a href="/patient/reports" className="text-blue-600 hover:underline">
                    View Reports
                </a>
                <a href="/patient/tests" className="text-blue-600 hover:underline">
                    View Tests
                </a>
            </div>
        </div>
    );
};

export default PatientHome;
