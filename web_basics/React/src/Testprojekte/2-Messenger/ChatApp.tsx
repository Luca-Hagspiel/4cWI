import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import Chat from "./Components/Chat.tsx";
import Cookies from "universal-cookie";
import axios from "axios";
import Settings from "./Components/Settings";
import { FiSettings } from "react-icons/fi";

const cookies = new Cookies();

function ChatApp() {
    const navigate = useNavigate();

    const [isAuth, setIsAuth] = useState(() => cookies.get("AuthToken") || null);
    const [username, setUsername] = useState(() => cookies.get("Username") || "");
    const [room, setRoom] = useState(() => cookies.get("RoomID") || "");
    const [usernameList, setUsernameList] = useState<string[]>([]);
    const [Count, setCount] = useState(0);
    const [ProfileSource, setProfileSource] = useState("/Testprojekte/2-Messenger/default-profile-picture.png");

    const roomInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isAuth || !username) {
            navigate("/Testprojekte/2-SignIn");
        }
    }, [isAuth, username, navigate]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await axios.get("http://localhost:3001/api/getUsers");
                const otherUsers = result.data.filter((user: string) => user !== username);
                setUsernameList(otherUsers);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, [username]);

    useEffect(() => {
        if (isAuth) {
            const fetchProfilePicture = async () => {
                try {
                    const res = await axios.get(`http://localhost:3001/api/profilbildSource/${username}`);
                    // Überprüfung, ob profilbildSource existiert, sonst Default
                    setProfileSource(res.data.profilbildSource || "/Testprojekte/2-Messenger/default-profile-picture.png");
                } catch (err) {
                    console.error(err);
                    setProfileSource("/Testprojekte/2-Messenger/default-profile-picture.png");
                }
            };
            fetchProfilePicture();
        }
    }, [username, isAuth]);

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
        if (roomInputRef.current && roomInputRef.current.value.trim() !== "") {
            const newRoom = roomInputRef.current.value.trim();
            setRoom(newRoom);
            cookies.set("RoomID", newRoom, { path: "/", maxAge: 60 * 30 }); // 30 Min
            roomInputRef.current.value = "";
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-800 p-4">
            <div className="w-60 bg-gray-800 border-r border-gray-700 p-4 flex flex-col h-screen">
                <h1 className="text-white text-center mb-4 font-semibold">Alle registrierten User</h1>
                <div className="flex-1 overflow-y-auto mb-4">
                    <ul>
                        {usernameList.map((user, idx) => (
                            <li key={idx} className="text-gray-300 mb-1">{user}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-auto mb-4 flex items-center justify-between px-2 border-t border-gray-700 pt-3">
                    <div className="flex-1 flex items-center">
                        <img
                            className="size-10 rounded-full mr-3"
                            src={ProfileSource || "/Testprojekte/2-Messenger/default-profile-picture.png"}
                            alt="Profilbild"
                            onError={(e) => { (e.target as HTMLImageElement).src = "/Testprojekte/2-Messenger/default-profile-picture.png"; }}
                        />
                        {username && <span className="text-white mb-0">{username}</span>}
                    </div>
                    <button
                        onClick={() => setCount(Count + 1)}
                        className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-shadow shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        title="Einstellungen"
                    >
                        <FiSettings size={20} />
                    </button>
                </div>
            </div>

            {Count === 0 ? null : <Settings onClose={() => setCount(0)} handleLogout={handleLogout} username={username} />}

            <div className="flex-1 flex flex-col items-center justify-center relative">
                {room ? (
                    <Chat />
                ) : (
                    <div className="w-full max-w-md bg-gray-700 rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-700">
                        <label className="text-gray-300 mb-2 font-medium">Raumnamen eingeben:</label>
                        <input
                            ref={roomInputRef}
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
        </div>
    );
}

export default ChatApp;
