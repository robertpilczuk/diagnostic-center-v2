import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";

interface Prescription {
    id: number;
    medication: string;
    issued_at: string;
}

interface TestResult {
    id: number;
    result_data: string;
    result_date: string;
    pdf?: string;
}

const PatientReportsPage = () => {
    const { token } = useAuth();
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [testResults, setTestResults] = useState<TestResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const [presRes, testRes] = await Promise.all([
                    api.get("/patient/prescriptions/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    api.get("/patient/test-results/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                setPrescriptions(presRes.data);
                setTestResults(testRes.data);
            } catch (err) {
                console.error("Error fetching reports:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, [token]);

    if (loading) {
        return <div className="p-8 text-blue-600 font-semibold">Loading reports...</div>;
    }

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold mb-4">Your Prescriptions</h1>
                {prescriptions.length === 0 ? (
                    <p className="text-gray-600">No prescriptions available.</p>
                ) : (
                    <ul className="space-y-4">
                        {prescriptions.map((p) => (
                            <li key={p.id} className="p-4 border rounded bg-white shadow">
                                <div><strong>Medication:</strong> {p.medication}</div>
                                <div><strong>Date:</strong> {new Date(p.issued_at).toLocaleDateString()}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                <h1 className="text-2xl font-bold mb-4">Your Test Results</h1>
                {testResults.length === 0 ? (
                    <p className="text-gray-600">No test results available.</p>
                ) : (
                    <ul className="space-y-4">
                        {testResults.map((r) => (
                            <li key={r.id} className="p-4 border rounded bg-white shadow">
                                <div><strong>Result:</strong> {r.result_data}</div>
                                <div><strong>Date:</strong> {new Date(r.result_date).toLocaleDateString()}</div>
                                {r.pdf ? (
                                    <a
                                        href={r.pdf}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-fuchsia-700 hover:underline mt-1 block"
                                    >
                                        Download PDF
                                    </a>
                                ) : (
                                    <span className="text-gray-500 mt-1 block">No PDF available</span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PatientReportsPage;
