import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface Report {
    id: number;
    test_name: string;
    date: string;
    result: string;
    file_url?: string;
}

const mockReports: Report[] = [
    {
        id: 1,
        test_name: "Morfologia",
        date: "2025-05-15",
        result: "W normie",
        file_url: "/mock/morfologia.pdf"
    },
    {
        id: 2,
        test_name: "Glukoza",
        date: "2025-05-20",
        result: "Podwyższony poziom",
        file_url: ""
    },
];

const PatientReportsPage = () => {
    const { user } = useAuth();
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setReports(mockReports);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <div className="p-8 text-blue-600 font-semibold">Loading reports...</div>;
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Test Reports</h1>
            <ul className="space-y-4">
                {reports.map((report) => (
                    <li key={report.id} className="p-4 border rounded bg-white shadow">
                        <div><strong>Test:</strong> {report.test_name}</div>
                        <div><strong>Date:</strong> {report.date}</div>
                        <div><strong>Result:</strong> {report.result}</div>
                        {report.file_url ? (
                            <a href={report.file_url} className="text-fuchsia-700 hover:underline mt-1 block">
                                Download PDF
                            </a>
                        ) : (
                            <span className="text-gray-500 mt-1 block">No PDF available</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientReportsPage;
