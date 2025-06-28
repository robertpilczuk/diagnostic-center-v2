import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

interface TestOrder {
    id: number;
    test_name: string;
    ordered_at: string;
    patient_username: string;
    patient_pesel: string;
}

interface TestResultFormData {
    description: string;
    pdf: File | null;
    sample_id: number | null;
}

const TestOrderDetailsPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<TestOrder | null>(null);
    const [sampleId, setSampleId] = useState<number | null>(null);
    const [formData, setFormData] = useState<TestResultFormData>({
        description: "",
        pdf: null,
        sample_id: null,
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await api.get(`/lab/test-orders/${id}/`);
                setOrder(response.data);
            } catch {
                setError("Failed to fetch order details");
            }
        };

        const fetchSample = async () => {
            try {
                const response = await api.get(`/samples/?test_order=${id}`);
                if (response.data.length > 0) {
                    setSampleId(response.data[0].id);
                    setFormData((prev) => ({ ...prev, sample_id: response.data[0].id }));
                }
            } catch (err) {
                console.error("Failed to fetch sample:", err);
            }
        };

        Promise.all([fetchOrder(), fetchSample()]).finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData((prev) => ({ ...prev, pdf: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!formData.sample_id || !formData.pdf) {
            setMessage("Missing sample ID or PDF file.");
            return;
        }

        const data = new FormData();
        data.append("description", formData.description);
        data.append("pdf", formData.pdf);
        data.append("sample", String(formData.sample_id));

        try {
            await api.post("/test-results/", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage("Result submitted successfully.");
        } catch {
            setMessage("Failed to submit result.");
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;
    if (!order) return <div className="p-6">No data found.</div>;

    return (
        <div className="p-6 max-w-xl mx-auto bg-white shadow-xl rounded-xl space-y-4">
            <h1 className="text-2xl font-bold">Test Order Details</h1>
            <p><strong>Test:</strong> {order.test_name}</p>
            <p><strong>Ordered at:</strong> {new Date(order.ordered_at).toLocaleString()}</p>
            <p><strong>Patient:</strong> {order.patient_username} (PESEL: {order.patient_pesel})</p>

            {sampleId ? (
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <h2 className="text-lg font-semibold">Add Test Result</h2>
                    <textarea
                        name="description"
                        placeholder="Result description"
                        className="w-full border rounded p-2"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="block"
                        required
                    />
                    <p className="text-sm text-gray-600">Sample ID: <strong>{sampleId}</strong></p>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Submit Result
                    </button>
                    {message && <p className="text-sm mt-2">{message}</p>}
                </form>
            ) : (
                <p className="text-gray-500 mt-4">No sample registered yet for this order.</p>
            )}
        </div>
    );
};

export default TestOrderDetailsPage;
