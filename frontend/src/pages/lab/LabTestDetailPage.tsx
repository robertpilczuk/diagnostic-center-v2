import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../contexts/AuthContext";

interface TestOrderDetail {
    id: number;
    test_name: string;
    ordered_at: string;
    patient_username: string;
    patient_pesel: string;
    result_data?: string | null;
    result_id?: number | null;
}

const LabTestDetailsPage = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const [testOrder, setTestOrder] = useState<TestOrderDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestOrder = async () => {
            try {
                const res = await api.get(`/lab/test-orders/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTestOrder(res.data);
            } catch (err) {
                console.error("Failed to load test order", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTestOrder();
    }, [id, token]);

    if (loading) return <div className="p-6">Loading test details...</div>;
    if (!testOrder) return <div className="p-6 text-red-500">Test not found.</div>;

    return (
        <div className="p-6 max-w-2xl mx-auto space-y-4 bg-white shadow rounded">
            <h1 className="text-2xl font-bold">Test Details</h1>
            <p><strong>Test:</strong> {testOrder.test_name}</p>
            <p><strong>Ordered at:</strong> {new Date(testOrder.ordered_at).toLocaleDateString()}</p>
            <p><strong>Patient:</strong> {testOrder.patient_username} (PESEL: {testOrder.patient_pesel})</p>

            {testOrder.result_data ? (
                <div className="mt-4">
                    <p><strong>Result:</strong> {testOrder.result_data}</p>
                    {testOrder.result_id && (
                        <a
                            href={`/api/test-results/${testOrder.result_id}/download/`}
                            className="text-blue-600 underline mt-2 inline-block"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Download PDF
                        </a>
                    )}
                </div>
            ) : (
                <p className="text-gray-500 mt-4">No test result available yet.</p>
            )}
        </div>
    );
};

export default LabTestDetailsPage;
