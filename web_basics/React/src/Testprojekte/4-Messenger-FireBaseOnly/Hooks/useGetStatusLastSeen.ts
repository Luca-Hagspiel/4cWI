import { doc, getDoc, Timestamp } from "firebase/firestore";
import { authMessenger, db } from "../Components/firebase-config";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const GetLastSeen = async (uid: string) => {
    try {
        const docSnap = await getDoc(doc(db, "user", uid));
        const data = docSnap.data();
        return data?.lastSeen || null;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const useGetStatusLastSeen = (uid:string) => {
    const [status, setStatus] = useState<"online" | "offline">("offline");

    useEffect(() => {
        if (!uid) return;

        const checkLastSeen = async () => {
            const lastSeenTimestamp: Timestamp | null = await GetLastSeen(uid);
            if (!lastSeenTimestamp) {
                setStatus("offline");
                return;
            }

            const lastSeenDate = lastSeenTimestamp.toDate();
            const now = new Date();
            const diffMinutes = (now.getTime() - lastSeenDate.getTime()) / (1000 * 60);

            diffMinutes > 15 ? setStatus("offline") : setStatus("online");
        };

        checkLastSeen();

        const interval = setInterval(checkLastSeen, 1000 * 60);
        return () => clearInterval(interval);
    }, [uid]);

    return status;
};

export default useGetStatusLastSeen;
