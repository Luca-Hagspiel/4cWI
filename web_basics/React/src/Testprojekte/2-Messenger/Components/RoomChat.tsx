import { useEffect, useState, useRef } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, arrayUnion, updateDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config.ts";
import Cookies from "universal-cookie";
import dayjs from "dayjs";
import axios from "axios";

const cookies = new Cookies();

const RoomChat = () => {
    const [username] = useState(() => cookies.get("Username"));
    const [RoomID, setRoomID] = useState(() => cookies.get("RoomID") || "");
    const [NewMessage, setNewMessage] = useState("");
    const [Message, setMessage] = useState<any[]>([]);
    const [UserList, setUserList] = useState<any[]>([])
    const [ProfileSourceMe, setProfileSourceMe] = useState("");
    const [ProfileSourceRest, setProfileSourceRest] = useState();


    const messagesEndRef = useRef(null);
    const messageRef = collection(db, "room_collection", `room_${RoomID}`, "messages");
    const participantsRef = doc(db, "room_collection", `room_${RoomID}`);

    useEffect(() => {
        const unsubscribeMessages = onSnapshot(
            query(messageRef, orderBy("createdAt", "asc")),
            snapshot => {
                const arr = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setMessage(arr);
            }
        );

        const unsubscribeUsers = onSnapshot(participantsRef, snapshot => {
            const data = snapshot.data();
            const newList = data?.participants || [];

            setUserList(prev => {
                const same =
                    JSON.stringify(prev) === JSON.stringify(newList);
                if (!same) return newList;
                return prev;
            });
        });

        return () => {
            unsubscribeMessages();
            unsubscribeUsers();
        };
    }, [RoomID]);


    useEffect(() => {
        const checkRoom = async () => {
            if (!RoomID) return;

            const roomDocRef = doc(db, "room_collection", `room_${RoomID}`);
            const roomSnap = await getDoc(roomDocRef);

            if (!roomSnap.exists()) {
                await setDoc(roomDocRef, {
                    participants: [],
                    createdAt: serverTimestamp(),
                });
            }
        };
        checkRoom();
    }, [RoomID]);

    useEffect(() => {
        scrollToBottom();
    }, [Message]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const resMe = await axios.get(`http://localhost:3001/api/profilbildSource/${username}`);
                const newMe = resMe.data.profilbildSource || "/Testprojekte/2-Messenger/default-profile-picture.png";
                setProfileSourceMe(newMe);

                const res = await axios.post(
                    `http://localhost:3001/api/participantsProfiles`,
                    { users: UserList }
                );
                setProfileSourceRest(res.data.users);


            } catch (err) {
                console.error(err);
            }
        };

        fetchProfiles();
    }, [UserList]);

    const scrollToBottom = () => {
        //@ts-ignore
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (NewMessage.trim() === "") return;

        await addDoc(messageRef, {
            text: NewMessage,
            createdAt: serverTimestamp(),
            user: username,
            });

        await updateDoc(participantsRef, {
            participants: arrayUnion(username)
        });

        setNewMessage("");
    };

    const leaveRoom = () => {
        cookies.remove("RoomID", { path: "/" });
        setRoomID("");
        setNewMessage("");
        window.location.reload();
    };

    return (
        <div className="flex flex-col w-full h-[100vh] mx-auto bg-gray-300 overflow-hidden">
            <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-700 shadow-sm">
                <span className="text-white font-semibold text-lg">Raum: {RoomID.toUpperCase()}</span>
                <button
                    onClick={leaveRoom}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-lg shadow-md transition-colors"
                >
                    X
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-800
        scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700
        scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
            >
                {Message.map((message) => {
                    const isOwn = message.user === username;

                    // @ts-ignore
                    const userProfile = ProfileSourceRest?.find((p: { username: any; }) => p.username === message.user);
                    const profileSrc = userProfile?.profilbildSource
                        || "/Testprojekte/2-Messenger/default-profile-picture.png";

                    return (
                        <div key={message.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                            <div className={`flex ${isOwn ? "flex-row-reverse" : "flex-row"} items-start space-x-2 ${isOwn ? "space-x-reverse" : ""}`}>
                                <img
                                    src={isOwn ? ProfileSourceMe : profileSrc}
                                    alt="profile"
                                    className="w-8 h-8 rounded-full object-cover"
                                />

                                <div className={`flex flex-col max-w-[80%]`}>
                                    {!isOwn && (
                                        <span className="text-sm font-semibold text-white">
                                        {message.user}
                                    </span>
                                    )}

                                    <div
                                        className={`mt-1 p-3 break-words rounded-2xl shadow-md
                                    ${
                                            isOwn
                                                ? "bg-purple-600 text-white rounded-br-none"
                                                : "bg-gray-700 text-gray-100 rounded-bl-none"
                                        }`}
                                    >
                                        {message.text}
                                    </div>

                                    <span className="text-xs text-gray-400 mt-1 self-end">
                                    {message.createdAt?.seconds
                                        ? dayjs(message.createdAt.seconds * 1000).format("HH:mm")
                                        : ""}
                                </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <form className="flex p-4 bg-gray-900 border-t border-gray-700" onSubmit={handleSubmit}>
                <input
                    className="flex-1 p-3 rounded-l-2xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Nachricht eingeben..."
                    value={NewMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-r-2xl shadow-md"
                >
                    Senden
                </button>
            </form>
        </div>
    );
};

export default RoomChat;