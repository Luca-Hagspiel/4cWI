import { signInWithCustomToken } from "firebase/auth";
import { auth } from "./Components/firebase-config.ts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Inputs from "./Components/Inputs.tsx";
import axios from "axios";
import Cookies from "universal-cookie";

const VITE_MONGO_ENV = import.meta.env.VITE_MONGO_ENV;


const cookies = new Cookies();

export default function SignIn() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ nutzername: "", passwort: "" });
    const [errors, setErrors] = useState({ nutzername: "", passwort: "" });

    useEffect(() => {
        const token = cookies.get("AuthToken");
        const username = cookies.get("Username");
        if (token && username) {
            signInWithCustomToken(auth, token)
                .then(() => navigate("/Testprojekte/2-ChatApp"))
                .catch(err => {
                    console.log("Fehler beim automatischen Login:", err);
                    cookies.remove("AuthToken", { path: "/" });
                    cookies.remove("Username", { path: "/" });
                });
        }
    }, []);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            const result = await axios.post(`${VITE_MONGO_ENV}/api/login/user`, formData);
            if (result.data.firebaseToken) {
                await signInWithCustomToken(auth, result.data.firebaseToken);

                cookies.set("AuthToken", result.data.firebaseToken, { path: "/", maxAge: 60 * 60 * 24 });
                cookies.set("Username", formData.nutzername, { path: "/", maxAge: 60 * 60 * 24 });

                navigate("/Testprojekte/2-ChatApp");
            } else {
                alert(result.data);
            }
        } catch (error: any) {
            console.log(error);
            if (error.response && error.response.status === 400) {
                alert("Nutzername oder Passwort falsch!");
            }
            Object.entries(formData).forEach(([key, value]) => {
                handleChange(key, value);
            });
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const validateField = (field: string, value: string) => {
        let error = "";
        if (field === "nutzername") {
            if (!value.trim()) error = "Dieses Feld darf nicht leer sein";
            else if (!/^[a-zA-Z0-9äöüÄÖÜß_-]+$/.test(value)) error = "Ungültige Zeichen";
            else if (value.length < 3) error = "Mindestens 3 Zeichen";
        }
        if (field === "passwort") {
            if (/\s/.test(value)) error = "Keine Leerzeichen erlaubt";
            else if (value.length < 8) error = "Mindestens 8 Zeichen";
        }
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-lg w-full max-w-md">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-3xl font-bold text-center mb-4 text-white">Herzlich Willkommen!</h1>
                        <p className="text-center text-gray-400 mb-8">Bitte füllen Sie die Textfelder aus</p>

                        <Inputs type="text" placeholder="Nutzername" value={formData.nutzername} onChange={e => handleChange("nutzername", e.target.value)} error={errors.nutzername}/>
                        <Inputs type="password" placeholder="Passwort" value={formData.passwort} onChange={e => handleChange("passwort", e.target.value)} error={errors.passwort}/>

                        <button type="submit" className="mt-6 w-full bg-purple-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors">
                            Anmelden
                        </button>
                    </form>
                    <p className="mt-5 text-gray-300 text-center">
                        Bist du neu hier?{" "}
                        <button className="text-purple-400 hover:text-purple-500" onClick={() => navigate("/Testprojekte/2-SignUp")}>
                            Registrieren
                        </button>
                    </p>
                </div>
            </div>

            <button type="button" onClick={() => window.open(`${VITE_MONGO_ENV}/api/users`, "_blank")} className="fixed bottom-4 right-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors">
                Gespeicherte Daten anzeigen
            </button>
        </>
    );
}
