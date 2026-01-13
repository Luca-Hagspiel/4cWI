import { useTranslation } from "react-i18next";
import { collection, getDocs, type DocumentData } from "firebase/firestore";
import { authMessenger, db } from "./firebase-config.ts";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { usePrivateChatStore } from "../store.ts";

interface FirestoreUser {
    id: string;
    username: string;
    profilepicture: string;
    uid: string;
}

const DEFAULT_AVATAR = "https://www.gravatar.com/avatar/?d=mp";

const validateImage = (url: string): Promise<string> => {
    return new Promise((resolve) => {
        if (!url) {
            resolve(DEFAULT_AVATAR);
            return;
        }
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => resolve(DEFAULT_AVATAR);
        img.src = url;
    });
};

const SignedUpUsers = () => {
    const { t } = useTranslation();
    const [userList, setUserList] = useState<FirestoreUser[]>([]);
    const [user] = useAuthState(authMessenger);

    const openPrivateChat = usePrivateChatStore((state) => state.openPrivateChat);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "user"));

            const rawData = querySnapshot.docs.map(doc => {
                const docData = doc.data() as DocumentData;
                return {
                    id: doc.id,
                    username: docData.username || docData.displayName || "",
                    profilepicture: docData.profilepicture || "",
                    uid: docData.uid || ""
                };
            });

            const data: FirestoreUser[] = await Promise.all(
                rawData.map(async (userData) => ({
                    ...userData,
                    profilepicture: await validateImage(userData.profilepicture)
                }))
            );

            setUserList(data
                .filter(item => item.uid !== user?.uid)
                .sort((a, b) => a.username.localeCompare(b.username)));

            console.log(data)
        };

        if (user) {
            fetchData().catch(console.error);
        }
    }, [user]);

    return (
        <div className="text-white">
            <h1 className="items-center flex flex-col border-b border-gray-700 py-2">
                {t('signedUpUsers.users')}
            </h1>

            <ul>
                {userList.map((list) => (
                    <li
                        key={list.id}
                        className="mt-2 flex items-center pl-2 rounded"
                    >
                        <button
                            onClick={() => openPrivateChat(list.uid, user?.uid || "")}
                            className={"flex items-center w-full text-left hover:bg-gray-700 p-2 rounded"}
                        >
                            <img
                                className="w-8 h-8 rounded-full mr-3 object-cover border border-gray-600"
                                src={list.profilepicture || "https://www.gravatar.com/avatar/?d=mp"}
                                alt={list.username}
                                onError={(e) => {
                                    e.currentTarget.src = "https://www.gravatar.com/avatar/?d=mp";
                                }}
                            />
                            <div className="flex flex-col">
                                <p className="text-white font-medium text-sm">{list.username}</p>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SignedUpUsers;
