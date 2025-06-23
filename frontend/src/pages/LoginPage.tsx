import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import backgroundImage from "../assets/login_bg.png"

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("api/token/", { username, password });
            const token = response.data.access;
            login(token);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid credentials");
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
                    className="w-full bg-white/30 rounded-[15px] px-4 py-2 placeholder:text-[#423F32]/80 text-[#423F32] text-[14px] focus:outline-none"
                />

                <input
                    type="password"
                    placeholder="Password*"
                    className="w-full bg-white/30 rounded-[15px] px-4 py-2 placeholder:text-[#423F32]/80 text-[#423F32] text-[14px] focus:outline-none"
                />

                <div className="w-full text-right">
                    <a href="#" className="text-[14.1px] text-[#8E0871] underline">
                        Forgot password
                    </a>
                </div>

                <button className="w-full bg-[#0088CC]/80 text-white font-bold text-[18.9px] py-2 rounded-[15px]">
                    Log In
                </button>

                <div className="text-[14.1px] text-[#423F32]">
                    Don’t have an account?{" "}
                    <a href="#" className="underline text-[#8E0871]">
                        Register here
                    </a>
                </div>

                {/* Linie + OR */}
                <div className="flex items-center w-full gap-4 my-2">
                    <hr className="flex-grow border-t border-black" />
                    <span className="text-[15px] text-black">OR</span>
                    <hr className="flex-grow border-t border-black" />
                </div>

                {/* Ikony logowania społecznościowego */}
                <div className="flex justify-center gap-6">
                    {/* Tutaj później SVG lub <Icon /> */}
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

}

export default LoginPage;
