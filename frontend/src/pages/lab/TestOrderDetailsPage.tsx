import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

interface TestOrder {
    id: number;
    test_name: string;
    ordered_at: string;
    patient_username: string;
    patient_pesel: string;
}

const TestOrderDetailsPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<TestOrder | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await api.get(`/lab/test-orders/${id}/`);
                setOrder(response.data);
            } catch (err) {
                setError("Failed to fetch order details");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (!order) return <div className="p-4">No data found.</div>;

    return (
        <div className="p-6 max-w-xl mx-auto bg-white shadow-xl rounded-xl">
            <h1 className="text-2xl font-bold mb-4">Test Order Details</h1>
            <p><strong>Test name:</strong> {order.test_name}</p>
            <p><strong>Ordered at:</strong> {new Date(order.ordered_at).toLocaleString()}</p>
            <p><strong>Patient:</strong> {order.patient_username} (PESEL: {order.patient_pesel})</p>
        </div>
    );
};

export default TestOrderDetailsPage;
