import {useAuthState} from "react-firebase-hooks/auth";
import {authMessenger} from "./Components/firebase-config";
import {useAuthStore} from "./store";
import SignIn from "./Components/SignIn.tsx";
import {useState} from "react";
import {FiSettings} from "react-icons/fi";
import Settings from "./Components/Settings.tsx";
import SignedUpUsers from "./Components/SignedUpUsers.tsx";
import {useTranslation} from "react-i18next";

const ChatApp = () => {

    const { t } = useTranslation();
    const IsAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [user] = useAuthState(authMessenger);

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <div className="relative">
            {user || IsAuthenticated ? (
                <div className="flex">

                    {isSettingsOpen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                            onClick={() => setIsSettingsOpen(false)}
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Settings onClose={() => setIsSettingsOpen(false)} />
                            </div>
                        </div>
                    )}

                    <div className="w-60 bg-gray-800 border-r border-gray-700 p-4 flex flex-col h-screen">
                        <SignedUpUsers/>

                        <div className="mt-auto flex items-center justify-between px-2 border-t border-gray-700 pt-4">
                            <div className="flex-1 flex items-center">
                                <img
                                    className="size-10 rounded-full mr-3"
                                    src={user?.photoURL || ''}
                                    alt="Profilbild"
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
                </div>
            ) : (
                <SignIn/>
            )}
        </div>
    );
};

export default ChatApp;
