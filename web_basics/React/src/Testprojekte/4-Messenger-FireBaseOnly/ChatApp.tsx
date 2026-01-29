import { useAuthState } from "react-firebase-hooks/auth";
import { authMessenger, db } from "./Components/firebase-config";
import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { usePrivateChatStore, useOpenUserInterfaceStore } from "./store";

import SignIn from "./Components/SignIn";
import Settings from "./Components/Settings";
import SignedUpUsers from "./Components/SignedUpUsers";
import PrivateChat from "./Components/PrivateChat";
import FirstLogin from "./Components/FirstLogin";
import OpenUserInterface from "./Components/OpenUserInterface";

import { doc, getDoc } from "firebase/firestore";

const ChatApp = () => {
    const { t } = useTranslation();

    const [user, loading] = useAuthState(authMessenger);

    const isPrivateChatOpen = usePrivateChatStore(
        (state) => state.isPrivateChatOpen
    );

    const isOpenUIVisible = useOpenUserInterfaceStore(
        (state) => state.isOpenUIVisible
    );

    const userChatData = useOpenUserInterfaceStore(
        (state) => state.userChatData
    );

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [hasUsername, setHasUsername] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const [firestoreDisplayName, setFirestoreDisplayName] =
        useState<string | null>(null);
    const [firestoreUID, setFirestoreUID] =
        useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) {
                setHasUsername(false);
                setIsReady(true);
                return;
            }

            try {
                const docSnap = await getDoc(doc(db, "user", user.uid));
                const data = docSnap.data();

                if (data?.username) {
                    setHasUsername(true);
                    setFirestoreDisplayName(
                        data.displayName || data.username || null
                    );
                    setFirestoreUID(data.uid || null);
                }
            } catch (err) {
                console.error("Fehler beim Laden des Users:", err);
                setHasUsername(false);
                setFirestoreDisplayName(null);
                setFirestoreUID(null);
            } finally {
                setIsReady(true);
            }
        };

        fetchUserData();
    }, [user]);

    /* ---------- LOADING ---------- */
    if (loading || !isReady) {
        return (
            <div className="flex h-screen items-center justify-center text-white">
                Loading...
            </div>
        );
    }

    /* ---------- AUTH ---------- */
    if (!user) return <SignIn />;
    if (!hasUsername) return <FirstLogin />;

    /* ---------- MAIN APP ---------- */
    return (
        <div className="relative flex w-full h-screen">
            {/* SCHWEBENDES OPEN USER INTERFACE */}
            {isOpenUIVisible && <OpenUserInterface userData={userChatData} />}

            {/* SETTINGS OVERLAY */}
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

            {/* Sidebar */}
            <div className="w-60 bg-gray-800 border-r border-gray-700 p-4 flex flex-col">
                <SignedUpUsers />

                <div className="mt-auto flex items-center justify-between px-2 border-t border-gray-700 pt-4">
                    <div className="flex-1 flex items-center overflow-hidden">
                        <img
                            className="size-10 rounded-full mr-3"
                            src={user.photoURL || "https://www.gravatar.com/avatar/?d=mp"}
                            alt="Profilbild"
                        />
                        <div className="truncate">
                            <span className="text-white">{firestoreDisplayName}</span>
                            <span className="text-gray-400">#{firestoreUID}</span>
                        </div>
                    </div>

                    <button
                        className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
                        onClick={() => setIsSettingsOpen(true)}
                        title={t("settings.title")}
                    >
                        <FiSettings size={20} />
                    </button>
                </div>
            </div>

            {/* Chat */}
            <div className="flex-1 bg-gray-900">
                {isPrivateChatOpen ? (
                    <PrivateChat />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-500">
                        <p>Placeholder</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatApp;
