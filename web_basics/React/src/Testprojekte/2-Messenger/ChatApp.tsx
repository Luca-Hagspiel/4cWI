import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import RoomChat from "./Components/RoomChat.tsx";
import Cookies from "universal-cookie";
import axios from "axios";
import Settings from "./Components/Settings";
import { FiSettings } from "react-icons/fi";
import PrivateChat from "./Components/PrivateChat.tsx";
import { auth } from "./Components/firebase-config.ts";
import { onAuthStateChanged, signInWithCustomToken } from "firebase/auth";

const cookies = new Cookies();


function ChatApp() {
    const navigate = useNavigate();

    const [isAuth, setIsAuth] = useState(false);
    const [username, setUsername] = useState(cookies.get("Username"));
    const [room, setRoom] = useState(() => cookies.get("RoomID") || "");
    const [privateChat, setPrivateChat] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchUser, setSearchUser] = useState("");

    const [usernameList, setUsernameList] = useState<string[]>([]);
    const [ProfileSourceList, setProfileSourceList] = useState<string[]>([]);
    const [Count, setCount] = useState(0);
    const [ProfileSource, setProfileSource] = useState("/Testprojekte/2-Messenger/default-profile-picture.png");

    const roomInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const token = cookies.get("AuthToken");
        const storedUsername = cookies.get("Username");

        if (token && storedUsername) {
            signInWithCustomToken(auth, token)
                .then(async () => {
                    const res = await axios.get(`http://localhost:3001/api/getToken/${storedUsername}/${token}`);
                    res.data.valid ? setIsAuth(true) : setIsAuth(false);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }

        const unsubscribe = onAuthStateChanged(auth, user => {
            if (!user) {
                setIsAuth(false);
                cookies.remove("AuthToken", { path: "/" });
                cookies.remove("Username", { path: "/" });
                navigate("/Testprojekte/2-SignIn");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        if (!loading && !isAuth) {
            cookies.remove("AuthToken", { path: "/" });
            cookies.remove("Username", { path: "/" });
            navigate("/Testprojekte/2-SignIn");
        }
    }, [loading, isAuth]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/getUsers`);
                const users = res.data as { username: string; profilbildSource: string }[];
                const otherUsers = users.filter(u => u.username !== username);
                setUsernameList(otherUsers.map(u => u.username));
                setProfileSourceList(otherUsers.map(u => u.profilbildSource));
            } catch (error) {
                console.error(error);
            }
        };
        if (isAuth) fetchUsers();
    }, [username, isAuth]);

    useEffect(() => {
        setPrivateChat(!!cookies.get("To"));
    }, []);

    useEffect(() => {
        if (isAuth) {
            const fetchProfilePicture = async () => {
                try {
                    const res = await axios.get(`http://localhost:3001/api/profilbildSource/${username}`);
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
        setIsAuth(false);
        setUsername("");
        setRoom("");
        navigate("/Testprojekte/2-SignIn");
    };

    const joinRoom = () => {
        if (roomInputRef.current && roomInputRef.current.value.trim() !== "") {
            const newRoom = roomInputRef.current.value.trim();
            setRoom(newRoom);
            cookies.remove("To", { path: "/" });
            cookies.set("RoomID", newRoom, { path: "/", maxAge: 60 * 30 });
            roomInputRef.current.value = "";
        }
    };

    const joinPrivate = (user: { user: string }) => {
        cookies.remove("RoomID", { path: "/" });
        cookies.set("To", user.user, { path: "/", maxAge: 60 * 30 });
        setPrivateChat(true);
        window.location.reload();
    };

    return (
        <div className="min-full flex bg-gray-800">
            <div className="w-60 bg-gray-800 border-r border-gray-700 p-4 flex flex-col h-screen">
                <h1 className="text-white text-center mb-4 font-semibold">Alle registrierten User</h1>
                <div className="flex-1 overflow-y-auto mb-4">
                    <div>
                        <input
                            className="w-full px-3 py-2 mb-4 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 "
                            type="text"
                            placeholder="Suchen"
                            onChange={e => setSearchUser(e.target.value)}
                        />
                    </div>

                    <ul>
                        {searchUser == "" ? (
                            usernameList.map((user, idx) => (
                            <li key={idx} className="text-gray-300 mb-3 hover:text-gray-400">
                                <button
                                    className={"flex hover:cursor-pointer"}
                                    onClick={() => { joinPrivate({ user }) }}
                                >
                                    <img className={"size-7 rounded-full mr-2 bg-gray-600 items-center justify-center"} src={ProfileSourceList[idx]} alt="" />
                                    <p className={"hover:border-b"}>{user}</p>
                                </button>
                            </li>
                            )
                        )) : null
                        }

                    </ul>
                </div>

                <div className="mt-auto flex items-center justify-between px-2 border-t border-gray-700 pt-4">
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
                {room ? <RoomChat /> : privateChat ? <PrivateChat /> : (
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