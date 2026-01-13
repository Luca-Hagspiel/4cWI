import {useAuthState} from "react-firebase-hooks/auth";
import {authMessenger} from "./Components/firebase-config";
import { useState } from "react";
import {FiSettings } from "react-icons/fi";
import {useTranslation} from "react-i18next";

import SignIn from "./Components/SignIn.tsx";
import Settings from "./Components/Settings.tsx";
import SignedUpUsers from "./Components/SignedUpUsers.tsx";
import PrivateChat from "./Components/PrivateChat.tsx";

import {useAuthStore, usePrivateChatStore} from "./store";
import FirstLogin from "./Components/FirstLogin.tsx";

const ChatApp = () => {

    const { t } = useTranslation();
    const [user] = useAuthState(authMessenger);

    const IsAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isPrivateChatOpen = usePrivateChatStore((state) => state.isPrivateChatOpen)

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [hasUsername] = useState(true);

    return (
        <div className="relative">
            {user || IsAuthenticated ? (
                hasUsername ? (
                    <div className="flex w-full h-screen">

                        {isSettingsOpen && (
                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                                onClick={() => setIsSettingsOpen(false)}
                            >
                                <div onClick={(e) => e.stopPropagation()}>
                                    <Settings onClose={() => setIsSettingsOpen(false)} />
                                </div>
                            </div>
                        )}

                        {/* SIDEBAR */}
                        <div className="w-60 bg-gray-800 border-r border-gray-700 p-4 flex flex-col">

                            <SignedUpUsers />

                            <div className="mt-auto flex items-center justify-between px-2 border-t border-gray-700 pt-4">
                                <div className="flex-1 flex items-center">
                                    <img
                                        className="size-10 rounded-full mr-3"
                                        src={user?.photoURL || 'https://www.gravatar.com/avatar/?d=mp'}
                                        alt="Profilbild"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://www.gravatar.com/avatar/?d=mp";
                                        }}
                                    />
                                    <span className="text-white">{user?.displayName}</span>
                                </div>

                                <button
                                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-shadow shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    onClick={() => setIsSettingsOpen(true)}
                                    title={t("settings.title")}
                                >
                                    <FiSettings size={20} />
                                </button>
                            </div>
                        </div>

                        {/* MAIN CONTENT AREA */}
                        <div className="flex-1 flex bg-gray-900">

                            {isPrivateChatOpen ? (
                                <div className="flex-1">
                                    <PrivateChat />
                                </div>
                            ) : (
                                <div className="flex-1 flex items-center justify-center text-gray-500">
                                    <p>Placeholder</p>
                                </div>
                            )}

                        </div>

                    </div>
                ) : (
                    <FirstLogin />
                )
            ) : (
                <SignIn />
            )}
        </div>
    );
};

export default ChatApp;
