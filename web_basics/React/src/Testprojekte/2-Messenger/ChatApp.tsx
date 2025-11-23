import {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";

const cookies = new Cookies();

function ChatApp() {
    const navigate = useNavigate();

    const [isAuth] = useState(cookies.get("AuthToken"));
    const [Room] = useState();

    useEffect(() => {
        if (!isAuth) {
            navigate("/Testprojekte/2-SignIn");
        }
    }, [isAuth, navigate]);

    if (!isAuth) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            {Room ? (
                <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-700">
                    <h1 className="text-2xl font-bold mb-4 text-white">Chat</h1>
                </div>
            ) : (
                <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-700">
                    <label className="text-gray-300 mb-2 font-medium">Enter Room Name:</label>
                    <input
                        className="w-full mb-4 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Raumname"
                    />
                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors shadow-md">
                        Join Room
                    </button>
                </div>
            )}
        </div>
    );
}

export default ChatApp;
