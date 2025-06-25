import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import backgroundImage from "../assets/login_bg.png"

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("api/token/", { username, password });
            const access = response.data.access;
            const refresh = response.data.refresh;

            auth.login(access, refresh);

            const userRes = await axios.get("/api/me", {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });

            const { is_patient, is_doctor, is_laboratory } = userRes.data;

            if (is_patient) {
                navigate("/patient");
            } else if (is_doctor) {
                navigate("/doctor");
            } else if (is_laboratory) {
                navigate("/lab");
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            console.error(err);
            setError("invalid credentials");
        }
    };

    return (
        <div
            className="w-screen h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="w-full max-w-[438px] bg-white/45 backdrop-blur-[25px] rounded-[25px] shadow-xl px-8 py-6 flex flex-col items-center space-y-4">
                <h1 className="text-[45px] font-bold text-[#0088CC]">Login</h1>

                <input
                    type="text"
                    placeholder="Email or Phone*"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/30 rounded-[15px] px-4 py-2 placeholder:text-[#423F32]/80 text-[#423F32] text-[14px] focus:outline-none"
                />

                <input
                    type="password"
                    placeholder="Password*"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/30 rounded-[15px] px-4 py-2 placeholder:text-[#423F32]/80 text-[#423F32] text-[14px] focus:outline-none"
                />

                <div className="w-full text-right">
                    <a href="#" className="text-[14.1px] text-[#8E0871] underline">
                        Forgot password
                    </a>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-[#0088CC]/80 text-white font-bold text-[18.9px] py-2 rounded-[15px]"
                >
                    Log In
                </button>

                <div className="text-[14.1px] text-[#423F32]">
                    Don’t have an account?{" "}
                    <Link to="/register" className="underline text-[#8E0871]">
                        Register here
                    </Link>
                </div>

                <div className="flex items-center w-full gap-4 my-2">
                    <hr className="flex-grow border-t border-black" />
                    <span className="text-[15px] text-black">OR</span>
                    <hr className="flex-grow border-t border-black" />
                </div>

                <div className="flex justify-center gap-6">
                    <div className="bg-white/50 rounded-[15px] p-2 w-10 h-10 flex items-center justify-center">
                        G
                    </div>
                    <div className="bg-white/50 rounded-[15px] p-2 w-10 h-10 flex items-center justify-center">
                        f
                    </div>
                    <div className="bg-white/50 rounded-[15px] p-2 w-10 h-10 flex items-center justify-center">
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
