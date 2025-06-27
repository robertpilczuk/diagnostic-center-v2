import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import backgroundImage from "../../assets/patient_tests_page_bg.png";

interface Test {
    id: number;
    name: string;
    status: string;
    date?: string;
    doctor?: string;
    reportUrl?: string;
}

const mockTestsResults = [
    {
        id: 1,
        test_name: "Morfologia",
        status: "Completed",
        date: "2025-05-10",
        doctor: "Dr Anna Nowak",
        reportUrl: "/mock/morfologia.pdf",
    },
    {
        id: 2,
        test_name: "Glukoza",
        status: "Pending",
        date: "2025-06-01",
        doctor: "Dr Kowalski",
        reportUrl: "",
    },
];

const PatientTestsPage = () => {
    const { user } = useAuth();
    const [tests, setTests] = useState<Test[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTests(
                mockTestsResults.map((t) => ({
                    id: t.id,
                    name: t.test_name,
                    status: t.status,
                    date: t.date,
                    doctor: t.doctor,
                    reportUrl: t.reportUrl,
                }))
            );
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
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
            {/* Nagłówek */}
            <div className="w-full max-w-3xl text-center">
                <h1 className="text-[32px] font-bold text-[#323232]">Your test results</h1>
                <h2 className="text-[24px] font-medium text-[#323232]/70 mt-2">Blood testing 1</h2>
            </div>

            {/* Ramka */}
            {/* Ramka z efektem glassmorphism */}
            <div className="w-[844px] h-[185px] rounded-[25px] shadow-xl bg-white/40 backdrop-blur-[20px] px-6 py-6 flex items-center justify-center">
                {/* Tabela w środku */}
                <div className="w-full h-full overflow-y-auto overflow-x-hidden rounded-[15px] border border-gray-300 bg-white/70">
                    <table className="min-w-full text-md text-left text-gray-800">
                        <thead className="bg-white/90">
                            <tr>
                                <th className="px-6 py-4 border-r">Test name</th>
                                <th className="px-6 py-4 border-r">Test data</th>
                                <th className="px-6 py-4 border-r">Doctor</th>
                                <th className="px-6 py-4">Download report</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tests.map((test) => (
                                <tr key={test.id} className="border-t border-gray-200 hover:bg-white/80">
                                    <td className="px-6 py-4">{test.name}</td>
                                    <td className="px-6 py-4">{test.date}</td>
                                    <td className="px-6 py-4">{test.doctor}</td>
                                    <td className="px-6 py-4">
                                        <a
                                            href={test.reportUrl}
                                            className="text-fuchsia-700 hover:underline font-medium"
                                        >
                                            Download
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        // </div >


    );
};

export default PatientTestsPage;
