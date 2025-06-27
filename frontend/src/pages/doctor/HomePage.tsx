import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";

interface Patient {
    id: number;
    username: string;
    pesel: string;
    date_of_birth: string;
    email: string;
}

const DoctorHome = () => {
    const { user } = useAuth();
    const [query, setQuery] = useState("");
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchPatients = async () => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const response = await api.get(`/patients/?search=${query}`);
            setPatients(response.data);
        } catch (err) {
            console.error("Failed to fetch patients", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}</h1>

            <input
                type="text"
                placeholder="Search patients by username or PESEL"
                className="w-full p-2 border rounded mb-4"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                onClick={fetchPatients}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
            >
                Search
            </button>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="space-y-4">
                    {patients.length === 0 && query && <li>No results found.</li>}
                    {patients.map((patient) => (
                        <li key={patient.id} className="p-4 border rounded shadow-sm bg-white">
                            <p className="font-semibold">{patient.username}</p>
                            <p>PESEL: {patient.pesel}</p>
                            <p>Email: {patient.email}</p>
                            <p>Date of birth: {patient.date_of_birth}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DoctorHome;
