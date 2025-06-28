import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

interface TestResult {
    id: number;
    description: string;
    pdf_file: string;
    created_at: string;
}

const PatientTestDetailsPage = () => {
    const { id } = useParams();
    const [results, setResults] = useState<TestResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/patient/tests/${id}/results/`)
            .then(res => setResults(res.data))
            .catch(err => console.error("❌ Failed to fetch test results:", err))
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Test Details</h1>
            {loading ? (
                <div>Loading...</div>
            ) : results.length > 0 ? (
                <ul className="space-y-4">
                    {results.map(result => (
                        <li key={result.id} className="p-4 bg-white rounded shadow">
                            <div><strong>Description:</strong> {result.description}</div>
                            <div><strong>Date:</strong> {new Date(result.created_at).toLocaleString()}</div>
                            <a
                                href={result.pdf_file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-fuchsia-700 hover:underline block mt-2"
                            >
                                Download PDF
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-gray-600">No results available yet.</div>
            )}
        </div>
    );
};

export default PatientTestDetailsPage;
