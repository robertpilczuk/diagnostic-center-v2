import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

interface TestOrder {
    id: number;
    test_name: string;
    ordered_at: string;
    patient_username: string;
    patient_pesel: string;
}

const LabTestsPage = () => {
    const [orders, setOrders] = useState<TestOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/lab/test-orders/")
            .then(res => setOrders(res.data))
            .catch(err => {
                console.error("❌ Failed to fetch test orders:", err);
                setError("Failed to load test orders.");
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Lab Test Orders</h1>
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-600">{error}</div>}
            {!loading && !error && orders.length === 0 && (
                <div>No test orders found.</div>
            )}
            {!loading && !error && orders.length > 0 && (
                <ul className="space-y-4">
                    {orders.map(order => (
                        <li key={order.id} className="p-4 bg-white rounded shadow">
                            <div><strong>Test:</strong> {order.test_name}</div>
                            <div><strong>Patient:</strong> {order.patient_username} (PESEL: {order.patient_pesel})</div>
                            <div><strong>Ordered at:</strong> {new Date(order.ordered_at).toLocaleString()}</div>
                            <Link
                                to={`/lab/test-orders/${order.id}`}
                                className="text-blue-600 hover:underline block mt-2"
                            >
                                View Details
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LabTestsPage;
