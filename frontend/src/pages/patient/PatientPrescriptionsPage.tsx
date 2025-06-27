import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface Prescription {
    id: number;
    description: string;
    issued_by: string;
    date: string;
}

const mockPrescriptions: Prescription[] = [
    {
        id: 1,
        description: "Paracetamol 500mg 2x dziennie przez 5 dni",
        issued_by: "Dr Anna Nowak",
        date: "2025-06-20",
    },
    {
        id: 2,
        description: "Ibuprofen 400mg w razie bólu",
        issued_by: "Dr Kowalski",
        date: "2025-06-10",
    },
];

const PatientPrescriptionsPage = () => {
    const { user } = useAuth();
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPrescriptions(mockPrescriptions);
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[40vh]">
                <div className="text-blue-600 text-lg font-semibold">Loading prescriptions...</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Your Prescriptions</h1>
            <ul className="space-y-4">
                {prescriptions.map((rx) => (
                    <li key={rx.id} className="border p-4 rounded shadow bg-white">
                        <div className="text-lg font-medium">{rx.description}</div>
                        <div className="text-sm text-gray-600">
                            Issued by: {rx.issued_by} on {new Date(rx.date).toLocaleDateString()}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientPrescriptionsPage;
