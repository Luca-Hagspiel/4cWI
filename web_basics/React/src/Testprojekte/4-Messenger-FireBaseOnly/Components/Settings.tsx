
//Settings sind bisher nur für Testzwecke erstellt worden.

import {authMessenger} from "./firebase-config.ts";
import {useAuthStore} from "../store.ts";

interface Props {
    onClose?: () => void
}

const Settings = ({onClose}: Props) => {

    const handleLogout = () => {
        authMessenger.signOut();
        useAuthStore.getState().setAuthFalse();
        window.location.reload();
    }

    return (
        <div className={"absolute top-16 left-16 bg-gray-700 border border-gray-600 rounded-lg p-4 w-64 shadow-lg z-50"}>
            <button
                onClick={() => {
                    alert("Lebe")
                    handleLogout();}}
                className={"text-white"}
            >Drück</button>
            <button onClick={onClose} className={"absolute top-2 right-2 text-white font-bold"}>X</button>
        </div>
    );
};
export default Settings;