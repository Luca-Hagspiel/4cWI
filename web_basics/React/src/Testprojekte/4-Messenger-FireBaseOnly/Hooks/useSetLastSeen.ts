import { useEffect } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../Components/firebase-config";

const useSetLastSeen = (user: any, isReady: boolean, hasUsername: boolean) => {
    useEffect(() => {
        if (!user || !isReady || !hasUsername) return;

        const updateLastSeen = async () => {
            try {
                await setDoc(doc(db, "user", user.uid), {
                    lastSeen: serverTimestamp()
                }, { merge: true });
                console.log("Update last seen");
            } catch (err) {
                console.error(err);
            }
        };

        updateLastSeen();
        const interval = setInterval(updateLastSeen, 1000 * 60 * 5);

        return () => clearInterval(interval);
    }, [user, isReady, hasUsername]);
};

export default useSetLastSeen;
