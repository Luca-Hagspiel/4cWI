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
import OpenUserInterface, { type UserPreview } from "./Components/OpenUserInterface";

import { doc, getDoc } from "firebase/firestore";
import useSetLastSeen from "./Hooks/useSetLastSeen.ts";

const ChatApp = () => {
    const { t } = useTranslation();
    const [user, loading] = useAuthState(authMessenger);

    const isPrivateChatOpen = usePrivateChatStore((state) => state.isPrivateChatOpen);
    const isOpenUIVisible = useOpenUserInterfaceStore((state) => state.isOpenUIVisible);
    const userChatData = useOpenUserInterfaceStore((state) => state.userChatData);

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [hasUsername, setHasUsername] = useState(false);
    const [isUserDataLoading, setIsUserDataLoading] = useState(true);
    const [profilePictureURL, setProfilePictureURL] = useState("https://www.gravatar.com/avatar/?d=mp");

    type UserDoc = {
        firstLoginCompleted?: boolean;
        uid?: string;
        displayName?: string;
        username?: string;
        usernameID?: string;
        profilepicture?: string;
    };

    const isUserPreview = (v: any): v is UserPreview => {
        return !!v && typeof v === 'object'
            && typeof v.id === 'string'
            && typeof v.displayName === 'string'
            && typeof v.username === 'string'
            && (v.status === undefined || v.status === 'online' || v.status === 'offline');
    };

    const [data, setData] = useState<UserDoc | null>(null);

    useSetLastSeen(user, !isUserDataLoading, hasUsername);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) {
                setHasUsername(false);
                setIsUserDataLoading(false);
                return;
            }

            setIsUserDataLoading(true);

            try {
                const docSnap = await getDoc(doc(db, "user", user.uid));
                const userData = docSnap.data() as UserDoc | undefined;

                if (userData?.username) {
                    setHasUsername(true);
                    setData(userData);
                    setProfilePictureURL(userData.profilepicture ?? "https://www.gravatar.com/avatar/?d=mp");
                } else setHasUsername(false);
            } catch (err) {
                console.error("Fehler beim Laden des Users:", err);
                setHasUsername(false);
            } finally {
                setIsUserDataLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    /* ---------- LOADING ---------- */
    if (loading || isUserDataLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    /* ---------- AUTH ---------- */
    if (!user) return <SignIn />;
    if (!hasUsername) return <FirstLogin />;

    /* ---------- MAIN APP ---------- */
    return (
        <div className="relative flex w-full h-screen">
            {/* OPEN USER INTERFACE */}
            {isOpenUIVisible && isUserPreview(userChatData) && (
                <OpenUserInterface userData={userChatData} />
            )}

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
                            src={profilePictureURL}
                            alt="Profilbild"
                        />
                        <div className="truncate">
                            <span className="text-white">
                                {data?.displayName ?? ""}
                            </span>
                            <span className="text-gray-500">
                                #
                                {data?.username?.split("#")[1] ?? ""}
                            </span>
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
                        <button onClick={() => console.log(data)}>
                            Placeholder
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatApp;
