import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";
import backgroundImage from "../../assets/patient_tests_page_bg.png";

interface PatientTest {
    id: number;
    test_name: string;
    ordered_at: string;
    doctor_name: string;
}

const PatientTestsPage = () => {
    const { user } = useAuth();
    const [tests, setTests] = useState<PatientTest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/patient/tests/")
            .then((res) => {
                setTests(
                    res.data.map((t: any) => ({
                        id: t.id,
                        name: t.test_name,
                        status: "Completed", // albo z backendu, jak będzie
                        date: new Date(t.ordered_at).toLocaleDateString(),
                        doctor: t.doctor_name,
                        reportUrl: t.result_pdf_url,
                    }))
                );
            })
            .catch((err) => console.error("❌ Failed to fetch tests:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[40vh]">
                <div className="text-blue-600 text-lg font-semibold">Loading...</div>
            </div>
        );
    }

    return (
        <div
            className="w-screen min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 gap-y-6"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="w-full max-w-3xl text-center">
                <h1 className="text-[32px] font-bold text-[#323232]">Your test results</h1>
                <h2 className="text-[24px] font-medium text-[#323232]/70 mt-2">
                    Laboratory testing summary
                </h2>
            </div>

            <div className="w-[844px] rounded-[25px] shadow-xl bg-white/40 backdrop-blur-[20px] px-6 py-6 flex items-center justify-center">
                <div className="w-full h-full overflow-y-auto overflow-x-hidden rounded-[15px] border border-gray-300 bg-white/70">
                    <table className="min-w-full text-md text-left text-gray-800">
                        <thead className="bg-white/90">
                            <tr>
                                <th className="px-6 py-4 border-r">Test name</th>
                                <th className="px-6 py-4 border-r">Ordered at</th>
                                <th className="px-6 py-4 border-r">Doctor</th>
                                <th className="px-6 py-4">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tests.map((test) => (
                                <tr key={test.id} className="border-t border-gray-200 hover:bg-white/80">
                                    <td className="px-6 py-4">{test.test_name}</td>
                                    <td className="px-6 py-4">{new Date(test.ordered_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">{test.doctor_name}</td>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/patient/tests/${test.id}`}
                                            className="text-fuchsia-700 hover:underline font-medium"
                                        >
                                            View details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {tests.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-4 text-gray-600">
                                        No tests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PatientTestsPage;
