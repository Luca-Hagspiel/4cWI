import { usePrivateChatStore } from "../store.ts";
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, } from "firebase/firestore";
import { authMessenger, db } from "./firebase-config.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { FiX } from "react-icons/fi";
import {useTranslation} from "react-i18next";

import React, { useEffect, useState, useRef } from "react";

const PrivateChat = () => {
    const [message, setMessage] = useState("");
    const [oldMessages, setOldMessages] = useState([]);

    const { t } = useTranslation();
    const closePrivateChat = usePrivateChatStore((state) => state.closePrivateChat);
    const participants = usePrivateChatStore((state) => state.participants) || [];
    const sortedParticipants = [...participants].sort((a, b) => a.localeCompare(b));

    const [user] = useAuthState(authMessenger);

    const chatId = `${sortedParticipants[0]}_${sortedParticipants[1]}`;
    const messagesCollectionRef = collection(db, "privateChat", chatId, "messages");

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const queryMessages = query(
            messagesCollectionRef,
            orderBy("createdAt", "asc")
        );

        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            const messagesArray: any[] = [];
            snapshot.docs.forEach((doc) =>
                messagesArray.push({ ...doc.data(), id: doc.id })
            );
            // @ts-ignore
            setOldMessages(messagesArray);
        });

        return () => unsubscribe();
    }, [participants]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [oldMessages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() === "") return;

        await addDoc(messagesCollectionRef, {
            text: message,
            createdAt: serverTimestamp(),
            sender: user?.displayName,
            senderUid: user?.uid,
        });

        setMessage("");
    };

    return (
        <div className="w-full h-full bg-gray-900 flex flex-col">
            {/* HEADER */}
            <div className="w-full px-4 p-3.5 border-b border-gray-700 flex items-center justify-between bg-gray-800">
                <p className="text-white font-semibold text-lg">{t("chat.privateChatTitle")}</p>
                <button
                    onClick={closePrivateChat}
                    className="absolute top-5 right-5 text-gray-400 hover:text-white text-2xl"
                >
                    <FiX />
                </button>
            </div>

            {/* CHAT CONTENT AREA */}
            <div
                ref={chatContainerRef}
                className="flex-1 p-4 overflow-y-auto"
            >
                {oldMessages.map((msg: any) => {
                    const isOwnMessage = msg.senderUid === user?.uid;
                    return (
                        <div
                            key={msg.id}
                            className={`flex ${
                                isOwnMessage ? "justify-end" : "justify-start"
                            } mb-2`}
                        >
                            <div
                                className={`
                                    relative
                                    px-4 py-2
                                    rounded-2xl
                                    max-w-xs
                                    ${
                                    isOwnMessage
                                        ? "bg-blue-600 text-white rounded-br-none"
                                        : "bg-gray-700 text-white rounded-bl-none"
                                }
                                    shadow-md
                                `}
                            >
                                <p className="break-words">{msg.text}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* MESSAGE INPUT */}
            <div className="p-4 border-t border-gray-700 bg-gray-800">
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        type="text"
                        placeholder={t("chat.inputPlaceholder")}
                        className="w-full p-2.5 rounded-lg bg-gray-700 text-white focus:outline-none"
                    />
                </form>
            </div>
        </div>
    );
};

export default PrivateChat;
