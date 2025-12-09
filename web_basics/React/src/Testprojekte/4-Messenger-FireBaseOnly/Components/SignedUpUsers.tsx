import { useTranslation } from "react-i18next";
import { collection, getDocs, type DocumentData } from "firebase/firestore";
import { authMessenger, db } from "./firebase-config.ts";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";


interface FirestoreUser {
    id: string;
    username: string;
    profilepicture: string;
    uid: string;
}

const SignedUpUsers = () => {
    const { t } = useTranslation();
    const [userList, setUserList] = useState<FirestoreUser[]>([]);
    const [user] = useAuthState(authMessenger);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "user"));
            const data: FirestoreUser[] = querySnapshot.docs.map(doc => {
                const docData = doc.data() as DocumentData;
                return {
                    id: doc.id,
                    username: docData.username || "",
                    profilepicture: docData.profilepicture || "",
                    uid: docData.uid || ""
                };
            });
            setUserList(data.filter(item => item.uid !== user?.uid));
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
                {userList.map((user) => (
                    <li
                        key={user.id}
                        className="mt-2 flex items-center bg-gray-800 p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                        <img
                            className="w-8 h-8 rounded-full mr-3 object-cover border border-gray-600"
                            src={user.profilepicture}
                            alt={user.username}
                        />
                        <div className="flex flex-col">
                            <p className="text-white font-medium text-sm">{user.username}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SignedUpUsers;
