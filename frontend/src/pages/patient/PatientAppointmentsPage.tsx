import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface Appointment {
    id: number;
    laboratory: string;
    date: string;
    status: "pending" | "accepted" | "rejected";
}

const mockAppointments: Appointment[] = [
    {
        id: 1,
        laboratory: "Lab-Med Kraków",
        date: "2025-07-01T10:00:00",
        status: "pending",
    },
    {
        id: 2,
        laboratory: "Diagnostyka Lublin",
        date: "2025-07-10T12:30:00",
        status: "accepted",
    },
];

const PatientAppointmentsPage = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAppointments(mockAppointments);
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[40vh]">
                <div className="text-blue-600 text-lg font-semibold">Loading appointments...</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Your Appointments</h1>
            <table className="min-w-full border text-left text-gray-800 bg-white shadow rounded">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 border-b">Laboratory</th>
                        <th className="px-4 py-3 border-b">Date</th>
                        <th className="px-4 py-3 border-b">Status</th>
                        <th className="px-4 py-3 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appt) => (
                        <tr key={appt.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border-b">{appt.laboratory}</td>
                            <td className="px-4 py-2 border-b">{new Date(appt.date).toLocaleString()}</td>
                            <td className="px-4 py-2 border-b capitalize">{appt.status}</td>
                            <td className="px-4 py-2 border-b space-x-2">
                                <button className="text-blue-600 hover:underline">Reschedule</button>
                                <button className="text-red-600 hover:underline">Cancel</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientAppointmentsPage;
