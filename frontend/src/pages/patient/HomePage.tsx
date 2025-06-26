import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const mockTests = [
    { id: 1, name: "Blood Test", status: "Pending" },
    { id: 2, name: "X-Ray", status: "Completed" },
    { id: 3, name: "MRI", status: "Awaiting Results" },
]

const PatientHome = () => {
    const { user } = useAuth();

    if (!user) return <div>Loading...</div>

    if (!user.is_patient) {
        return <Navigate to="/" />;
    }

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-4">
                Welcome, {user?.username}
            </h1>
            <h2 className="text-xl font-semibold mb-2">Your Tests</h2>
            <ul className="space-y-3">
                {mockTests.map((test) => (
                    <li key={test.id} className="border p-4 rounded shadow">
                        <div className="font-semibold">{test.name}</div>
                        <div className="text-sm text-gray-600">Status: {test.status}</div>
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default PatientHome;