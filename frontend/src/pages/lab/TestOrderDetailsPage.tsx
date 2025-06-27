import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import type { ChangeEvent, FormEvent } from "react";

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
            } catch (err) {
                setError("Failed to fetch order details");
            }
        };

        const fetchSample = async () => {
            try {
                const response = await api.get(`/lab/samples/?test_order=${id}`);
                if (response.data.length > 0) {
                    const sample = response.data[0]; // załóżmy że jeden sample
                    setSampleId(sample.id);
                    setFormData(prev => ({ ...prev, sample_id: sample.id }));
                }
            } catch (err) {
                console.error("Could not fetch sample:", err);
            }
        };

        Promise.all([fetchOrder(), fetchSample()]).finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData(prev => ({ ...prev, pdf: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!formData.sample_id || !formData.pdf) {
            setMessage("Sample ID or PDF is missing.");
            return;
        }

        const submission = new FormData();
        submission.append("description", formData.description);
        submission.append("pdf", formData.pdf);
        submission.append("sample", String(formData.sample_id));

        try {
            await api.post("/lab/test-results/", submission, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage("Test result submitted successfully.");
        } catch (err) {
            console.error(err);
            setMessage("Submission failed.");
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (!order) return <div className="p-4">No data found.</div>;

    return (
        <div className="p-6 max-w-xl mx-auto bg-white shadow-xl rounded-xl">
            <h1 className="text-2xl font-bold mb-4">Test Order Details</h1>
            <p><strong>Test name:</strong> {order.test_name}</p>
            <p><strong>Ordered at:</strong> {new Date(order.ordered_at).toLocaleString()}</p>
            <p><strong>Patient:</strong> {order.patient_username} (PESEL: {order.patient_pesel})</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                    <label className="block font-semibold">Description</label>
                    <textarea
                        name="description"
                        className="w-full border rounded p-2"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">PDF File</label>
                    <input type="file" onChange={handleFileChange} accept="application/pdf" />
                </div>
                {sampleId && (
                    <p className="text-sm text-gray-600">Using sample ID: <strong>{sampleId}</strong></p>
                )}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit Result
                </button>
                {message && <p className="text-sm text-green-600">{message}</p>}
            </form>
        </div>
    );
};

export default TestOrderDetailsPage;
