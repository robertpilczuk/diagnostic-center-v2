import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

interface PatientTestDetails {
    id: number;
    test_name: string;
    ordered_at: string;
    doctor_name: string;
    description: string;
    result_pdf_url: string;
}

const PatientTestDetailsPage = () => {
    const { id } = useParams();
    const [test, setTest] = useState<PatientTestDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get(`/patient/tests/${id}/`)
            .then((res) => setTest(res.data))
            .catch((err) => {
                console.error("❌ Failed to fetch test details:", err);
                setError("Failed to load test details.");
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="p-8">Loading...</div>;
    if (error) return <div className="p-8 text-red-600">{error}</div>;
    if (!test) return <div className="p-8">No data found.</div>;

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-2xl font-bold mb-4">{test.test_name}</h1>
            <p className="mb-2"><strong>Ordered at:</strong> {new Date(test.ordered_at).toLocaleString()}</p>
            <p className="mb-2"><strong>Doctor:</strong> {test.doctor_name}</p>
            <div className="mb-4">
                <strong>Description:</strong>
                <p className="mt-1 text-gray-700">{test.description}</p>
            </div>
            {test.result_pdf_url ? (
                <a
                    href={test.result_pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-fuchsia-700 text-white px-4 py-2 rounded hover:bg-fuchsia-800"
                >
                    Download PDF
                </a>
            ) : (
                <p className="text-gray-500">No PDF file available.</p>
            )}
        </div>
    );
};

export default PatientTestDetailsPage;
