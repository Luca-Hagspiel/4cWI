import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { collection, query, where, getDocs, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { authMessenger, db } from "./firebase-config.ts";
import { useAuthStore } from "../store.ts";
import { useAuthState } from "react-firebase-hooks/auth";

const FirstLogin = () => {
    const [username, setUsername] = useState("");
    const [uid, setUid] = useState("");
    const [error, setError] = useState("");
    const { t } = useTranslation();
    const setAuthFalse = useAuthStore((state) => state.setAuthFalse);
    const [user] = useAuthState(authMessenger);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!user) {
            setAuthFalse();
            return;
        }

        if (!username || uid.length !== 4) {
            setError(t('firstlogin.errorIncomplete'));
            return;
        }

        const uniqueName = `${username}#${uid}`;

        const q = query(
            collection(db, "user"),
            where("username", "==", uniqueName)
        );
        const querySnap = await getDocs(q);

        if (!querySnap.empty) {
            setError(t('firstlogin.errorTaken'));
            return;
        }

        const userRef = doc(db, "user", user.uid);
        await setDoc(
            userRef,
            {
                username: uniqueName,
                displayName: username,
                firstLoginCompleted: true,
                createdAt: serverTimestamp(),
            },
            { merge: true }
        );

        window.location.reload();
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-900 text-white px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-xl shadow-lg w-full sm:w-96 md:w-[480px] flex flex-col gap-6"
            >
                <h2 className="text-2xl font-bold text-center mb-4">{t('firstlogin.username')}</h2>

                <div className="flex gap-4 items-end">
                    <label className="flex-1 flex flex-col text-sm font-medium">
                        {t('firstlogin.username')}
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^a-zA-Z0-9_<>\-]/g, "");
                                setUsername(value);
                            }}
                            className="mt-2 p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                            placeholder="Ex. JohnDoe"
                        />
                    </label>

                    <label className="flex flex-col text-sm font-medium">
                        UID
                        <input
                            type="text"
                            value={uid}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                                setUid(val);
                            }}
                            className="mt-2 p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-20 text-base"
                            placeholder="Ex. 0000"
                        />
                    </label>
                </div>

                {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                )}

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition text-base"
                >
                    {t('firstlogin.save')}
                </button>
            </form>
        </div>
    );
};

export default FirstLogin;
