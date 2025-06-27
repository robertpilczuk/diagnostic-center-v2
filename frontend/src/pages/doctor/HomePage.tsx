import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../contexts/AuthContext";

interface Patient {
    id: number;
    username: string;
    email: string;
    pesel: string;
    date_of_birth: string;
}

const DoctorHome = () => {
    const { user } = useAuth();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get(`/patients/?search=${query}`);
            setResults(response.data);
        } catch (err: any) {
            setError("Error fetching patients");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Welcome, {user?.username}</h1>
            <p className="text-gray-700 mb-6">
                From here, you can search for patients, issue prescriptions, and order lab tests.
            </p>

            <h2 className="text-xl font-semibold mb-4">Search for Patients</h2>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Enter username or PESEL"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Search
                </button>
            </div>

            {loading && <div className="text-blue-600">Loading...</div>}
            {error && <div className="text-red-600">{error}</div>}

            <ul className="space-y-4 mt-4">
                {results.map((patient) => (
                    <li
                        key={patient.id}
                        className="border rounded p-4 bg-white shadow"
                    >
                        <p className="font-semibold">{patient.username}</p>
                        <p className="text-sm text-gray-700">PESEL: {patient.pesel}</p>
                        <p className="text-sm text-gray-700">
                            DOB: {patient.date_of_birth}
                        </p>
                        <p className="text-sm text-gray-700">Email: {patient.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default DoctorHome;
