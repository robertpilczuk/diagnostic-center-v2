import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface Tests {
    id: number;
    name: string;
    status: string;
}

const MyTests = () => {
    const { user } = useAuth();
    const [tests, setTests] = useState<Tests[]>([]);

    useEffect(() => {
        //axios.get('/api/patient/tests/')
        const mockData: Tests[] = [
            { id: 1, name: "Blood Test", status: "Pending" },
            { id: 2, name: "X-Ray", status: "Completed" },
            { id: 3, name: "MRI", status: "Awaiting Results" },
        ];
        setTests(mockData);
    }, []);

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-4">Your Tests</h1>
            {tests.length === 0 ? (
                <p>No tests available.</p>
            ) : (
                <ul className="space-y-3">
                    {tests.map((test) => (
                        <li key={test.id} className="border p-4 rounded shadow">
                            <div className="font-semibold">{test.name}</div>
                            <div className="text-sm text-gray-600">Status: {test.status}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyTests;