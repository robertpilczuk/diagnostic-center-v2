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

interface Sample {
    id: number;
    collected_at: string;
}

interface TestResultFormData {
    description: string;
    pdf: File | null;
    sample_id: number | null;
}

const TestOrderDetailsPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<TestOrder | null>(null);
    const [samples, setSamples] = useState<Sample[]>([]);
    const [formData, setFormData] = useState<TestResultFormData>({
        description: "",
        pdf: null,
        sample_id: null,
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [addingSample, setAddingSample] = useState(false);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [orderRes, samplesRes] = await Promise.all([
                    api.get(`/lab/test-orders/${id}/`),
                    api.get(`/lab/samples/?test_order=${id}`)
                ]);
                setOrder(orderRes.data);
                setSamples(samplesRes.data);
                if (samplesRes.data.length > 0) {
                    setFormData((prev) => ({ ...prev, sample_id: samplesRes.data[0].id }));
                }
            } catch (err) {
                console.error("❌ Failed to fetch order or samples:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, [id]);

    const handleAddSample = async () => {
        setAddingSample(true);
        try {
            await api.post("/lab/samples/", { test_order: id });
            const res = await api.get(`/lab/samples/?test_order=${id}`);
            setSamples(res.data);
            if (res.data.length > 0) {
                setFormData((prev) => ({ ...prev, sample_id: res.data[0].id }));
            }
        } catch (err) {
            console.error("❌ Failed to add sample:", err);
        } finally {
            setAddingSample(false);
        }
    };

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
            await api.post("/lab/test-results/", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage("✅ Result submitted successfully.");
        } catch (err) {
            console.error("❌ Failed to submit result:", err);
            setMessage("❌ Failed to submit result.");
        }
    };

    if (loading) return <div className="p-8 text-blue-600 font-semibold">Loading...</div>;

    return (
        <div className="p-8 max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Test Order Details</h1>
            {order && (
                <div className="space-y-1">
                    <div><strong>Test:</strong> {order.test_name}</div>
                    <div><strong>Ordered at:</strong> {new Date(order.ordered_at).toLocaleString()}</div>
                    <div><strong>Patient:</strong> {order.patient_username} (PESEL: {order.patient_pesel})</div>
                </div>
            )}

            <h2 className="text-xl font-semibold mt-4">Samples</h2>
            {samples.length === 0 ? (
                <div className="text-gray-500">
                    No samples yet.
                    <button
                        onClick={handleAddSample}
                        disabled={addingSample}
                        className="ml-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                        {addingSample ? "Adding..." : "Add Sample"}
                    </button>
                </div>
            ) : (
                <ul className="space-y-2">
                    {samples.map(s => (
                        <li key={s.id} className="p-3 bg-white rounded shadow">
                            <strong>Sample ID:</strong> {s.id} <br />
                            <strong>Collected:</strong> {new Date(s.collected_at).toLocaleString()}
                        </li>
                    ))}
                </ul>
            )}

            {samples.length > 0 && (
                <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
                    <h3 className="text-lg font-semibold">Submit Test Result</h3>
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
                    <p className="text-sm text-gray-600">
                        Saving for Sample ID: <strong>{formData.sample_id}</strong>
                    </p>
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Submit Result
                    </button>
                    {message && <p className="text-sm mt-2">{message}</p>}
                </form>
            )}
        </div>
    );
};

export default TestOrderDetailsPage;
