import {doc, getDoc} from "firebase/firestore";
import {authMessenger, db} from "./firebase-config.ts";
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";

const FirstLogin = () => {

    const [user] = useAuthState(authMessenger);
    const [username, setUsername] = useState("");
    const userUID = user?.uid;


    useEffect(() => {
        const fetchUserData = async () => {
            if (!userUID) return;

            const docRef = doc(db, "user", userUID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
            } else {
                console.log("Dokument existiert nicht");
            }
        }
        fetchUserData();
    }, [userUID])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("handleSubmit", username);
    }

    return (
        <div className={"h-screen flex items-center justify-center bg-gray-900 text-white"}>
            <form onSubmit={handleSubmit}>
                <label>Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};
export default FirstLogin;
