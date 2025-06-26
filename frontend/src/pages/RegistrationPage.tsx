import { useState } from "react";
// import axios from "axios";
import api from "../api/axios"
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
        pesel: "",
        date_of_birth: "",
        address: "",
        phone_number: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await api.post("/register/", formData);
            navigate("/login");
        } catch (err: any) {
            if (err.response?.data) {
                const raw = err.response.data;
                const errorText = typeof raw === "string" ? raw : Object.values(raw).flat().join(" ");
                setError(errorText);
            } else {
                setError("Registration failed.");
            }
            // setError("Registration failed.");
            // console.error(err);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow bg-white">
            <h1 className="text-2xl font-bold mb-4">Register as Patient</h1>

            {error && <p className="text-red-600 mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="password" name="password1" placeholder="Password" value={formData.password1} onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="password" name="password2" placeholder="Repeat Password" value={formData.password2} onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="text" name="pesel" placeholder="PESEL" value={formData.pesel} onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} className="w-full p-2 border rounded" />

                <button type="submit" className="w-full bg-blue-600 text-white font-semibold p-2 rounded">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;