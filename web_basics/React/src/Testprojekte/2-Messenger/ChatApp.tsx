import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import Chat from "./Components/Chat.tsx";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function ChatApp() {
    const navigate = useNavigate();


const [isAuth, setIsAuth] = useState(() => cookies.get("AuthToken") || null);
const [username, setUsername] = useState(() => cookies.get("Username") || "");
const [Room, setRoom] = useState(() => cookies.get("RoomID") || "");

const RoomInputRef = useRef<HTMLInputElement>(null);


useEffect(() => {
    if (!isAuth || !username) {
        navigate("/Testprojekte/2-SignIn");
    }
}, [isAuth, username, navigate]);

if (!isAuth) return null;

const handleLogout = () => {
    cookies.remove("AuthToken", { path: "/" });
    cookies.remove("Username", { path: "/" });
    cookies.remove("RoomID", { path: "/" });
    setIsAuth(null);
    setUsername("");
    setRoom("");
    navigate("/Testprojekte/2-SignIn");
};

const joinRoom = () => {
    if (RoomInputRef.current && RoomInputRef.current.value.trim() !== "") {
        const newRoom = RoomInputRef.current.value.trim();
        setRoom(newRoom);
        cookies.set("RoomID", newRoom, { path: "/", maxAge: 60*60*24 }); // 1 Tag
    }
};

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 relative">
        <div className="absolute top-4 right-4 flex items-center space-x-2">
            {username && <span className="text-white font-semibold">Hi, {username}!</span>}
            <button
                onClick={handleLogout}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
                Abmelden
            </button>
        </div>

        {Room ? (
            <Chat/>
        ) : (
            <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-700">
                <label className="text-gray-300 mb-2 font-medium">Raumnamen eingeben:</label>
                <input
                    ref={RoomInputRef}
                    className="w-full mb-4 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Raumname"
                />
                <button
                    onClick={joinRoom}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors shadow-md"
                >
                    Raum beitreten
                </button>
            </div>
        )}
    </div>
);

}

export default ChatApp;
