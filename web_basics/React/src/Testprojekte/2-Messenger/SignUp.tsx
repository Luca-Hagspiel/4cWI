import Inputs from "../1-SignUp-Website/Components/Inputs.tsx";
import {useState} from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function SignUp() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Nutzername: "",
        vorname: "",
        nachname: "",
        passwort: "",
        passwortWiederholen: ""
    });

    const [errors, setErrors] = useState({
        Nutzername: "",
        vorname: "",
        nachname: "",
        passwort: "",
        passwortWiederholen: ""
    });

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const { passwortWiederholen, ...postFormData} = formData;

        try {
            const result = await axios.post('http://localhost:3001/api/register/user', postFormData);
            console.log(result);
            alert("Benutzer erfolgreich erstellt!");
            navigate("/Testprojekte/2-SignIn");
        } catch (error: any) {
            console.log(error);

            if (error.response && error.response.data && error.response.data.message === "400") {
                alert("Nutzername bereits vergeben");
            }

            Object.entries(formData).forEach(([key, value]) => {
                handleChange(key, value);
            });
        }
    }

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const validateField = (field: string, value: string) => {
        let error = "";

        if (field === "vorname" || field === "nachname" || field === "Nutzername") {
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
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white border border-gray-300 rounded-xl p-8 shadow-lg w-100">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-3xl font-bold text-center mb-4">Herzlich Willkommen!</h1>
                        <p className="text-center text-gray-600 mb-8">Bitte füllen Sie die Textfelder aus</p>

                        <Inputs type="text" placeholder="Nutzername" value={formData.Nutzername} onChange={e => handleChange("Nutzername", e.target.value)} error={errors.Nutzername}/>
                        <Inputs type="text" placeholder="Vorname" value={formData.vorname} onChange={e => handleChange("vorname", e.target.value)} error={errors.vorname}/>
                        <Inputs type="text" placeholder="Nachname" value={formData.nachname} onChange={e => handleChange("nachname", e.target.value)} error={errors.nachname}/>
                        <Inputs type="password" placeholder="Passwort" value={formData.passwort} onChange={e => handleChange("passwort", e.target.value)} error={errors.passwort}/>
                        <Inputs type="password" placeholder="Passwort wiederholen" value={formData.passwortWiederholen} onChange={e => handleChange("passwortWiederholen", e.target.value)} error={errors.passwortWiederholen}/>

                        <button type="submit"
                                className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors">
                            Registrieren
                        </button>
                    </form>
                    <p className={"mt-5"}> Hast du bereits ein Account? Klick <button
                        className={"hover:cursor-pointer text-blue-700"}
                        onClick={() => navigate("/Testprojekte/2-SignIn")}>
                        hier!
                    </button>
                    </p>
                </div>
            </div>

            <button
                type="button"
                onClick={() => window.open("http://localhost:3001/api/users", "_blank")}
                className="fixed bottom-4 right-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors"
            >
                Gespeicherte Daten anzeigen
            </button>
        </>
    )
}
