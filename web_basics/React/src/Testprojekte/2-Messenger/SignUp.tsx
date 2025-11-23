import Inputs from "./Components/Inputs.tsx";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Cookies from "universal-cookie";
import {signInWithCustomToken} from "firebase/auth";
import {auth} from "./Components/firebase-config.ts";

const cookies = new Cookies();

export default function SignUp() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = cookies.get("AuthToken");
        if (token) {
            signInWithCustomToken(auth, token)
                .then(() => navigate("/Testprojekte/2-ChatApp"))
                .catch(err => {
                    console.log("Fehler beim automatischen Login:", err);
                    cookies.remove("AuthToken");
                });
        }
    }, []);

    const [formData, setFormData] = useState({
        nutzername: "",
        vorname: "",
        nachname: "",
        passwort: "",
        passwortWiederholen: ""
    });

    const [errors, setErrors] = useState({
        nutzername: "",
        vorname: "",
        nachname: "",
        passwort: "",
        passwortWiederholen: ""
    });

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const { passwortWiederholen, ...postFormData} = formData;

        try {
            const result = await axios.post('http://localhost:3001/api/register/user', postFormData);
            console.log(result);
            alert("Benutzer erfolgreich erstellt!");
            navigate("/Testprojekte/2-SignIn");
        } catch (error: any) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message === "exists") {
                setErrors(prev => ({ ...prev, nutzername: "Nutzername existiert bereits" }));
            } else {
                Object.entries(formData).forEach(([key, value]) => {
                    handleChange(key, value);
                });
            }
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const validateField = (field: string, value: string) => {
        let error = "";
        if (field === "vorname" || field === "nachname" || field === "nutzername") {
            if (!value.trim()) error = "Dieses Feld darf nicht leer sein";
            else if (!/^[a-zA-Z0-9äöüÄÖÜß_-]+$/.test(value)) error = "Ungültige Zeichen";
            else if (value.length < 3) error = "Mindestens 3 Zeichen";
        }
        if (field === "passwort") {
            if (/\s/.test(value)) error = "Keine Leerzeichen erlaubt";
            else if (value.length < 8) error = "Mindestens 8 Zeichen";
        }
        if (field === "passwortWiederholen" && value !== formData.passwort) error = "Passwörter stimmen nicht überein";

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
                        <Inputs type="text" placeholder="Vorname" value={formData.vorname} onChange={e => handleChange("vorname", e.target.value)} error={errors.vorname}/>
                        <Inputs type="text" placeholder="Nachname" value={formData.nachname} onChange={e => handleChange("nachname", e.target.value)} error={errors.nachname}/>
                        <Inputs type="password" placeholder="Passwort" value={formData.passwort} onChange={e => handleChange("passwort", e.target.value)} error={errors.passwort}/>
                        <Inputs type="password" placeholder="Passwort wiederholen" value={formData.passwortWiederholen} onChange={e => handleChange("passwortWiederholen", e.target.value)} error={errors.passwortWiederholen}/>

                        <button type="submit" className="mt-6 w-full bg-purple-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors">
                            Registrieren
                        </button>
                    </form>
                    <p className="mt-5 text-gray-300 text-center">
                        Hast du bereits ein Account? Klick{" "}
                        <button className="text-purple-400 hover:text-purple-500" onClick={() => navigate("/Testprojekte/2-SignIn")}>
                            hier!
                        </button>
                    </p>
                </div>
            </div>

            <button type="button" onClick={() => window.open("http://localhost:3001/api/users", "_blank")} className="fixed bottom-4 right-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors">
                Gespeicherte Daten anzeigen
            </button>
        </>
    );
}
