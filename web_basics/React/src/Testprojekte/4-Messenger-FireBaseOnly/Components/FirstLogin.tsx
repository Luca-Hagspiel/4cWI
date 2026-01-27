import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import { db, authMessenger } from './firebase-config.ts';
import {doc, getDoc, setDoc} from "firebase/firestore";

const FirstLogin = () => {

    const [user] = useAuthState(authMessenger);
    const [username, setUsername] = useState("");
    const userUID = user?.uid;


    useEffect(() => {
        const fetchUserData = async () => {
            if (!userUID) return;

            const docRef = doc(db, "user", userUID);
            const docSnap = await getDoc(docRef);
            const userdata = docSnap.data();

            if (docSnap.exists()) {



            } else {
                console.log("Document does not exist");
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
