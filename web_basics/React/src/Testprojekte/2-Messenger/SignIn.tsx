import Inputs from "../1-SignUp-Website/Components/Inputs.tsx";
import {useState} from "react";
import {useNavigate} from "react-router";
import axios from "axios";

export default function SignIn() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Nutzername: "",
        passwort: "",
    });

    const [errors, setErrors] = useState({
        Nutzername: "",
        passwort: "",
    });

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const result = await axios.post('http://localhost:3001/api/login/user', formData);
            if (result.data === "Success") {
                navigate("/Testprojekte")
            }
            else {
                alert(result.data)
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

    }

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const validateField = (field: string, value: string) => {
        let error = "";

        if (field === "Nutzername") {
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
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white border border-gray-300 rounded-xl p-8 shadow-lg w-100">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-3xl font-bold text-center mb-4">Herzlich Willkommen!</h1>
                        <p className="text-center  text-gray-600 mb-8">Bitte füllen Sie die Textfelder aus</p>

                        <Inputs type="text" placeholder="Nutzername" value={formData.Nutzername} onChange={e => handleChange("Nutzername", e.target.value)} error={errors.Nutzername}/>
                        <Inputs type="password" placeholder="Passwort" value={formData.passwort} onChange={e => handleChange("passwort", e.target.value)} error={errors.passwort}/>

                        <button type="submit"
                                className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors">
                            Anmelden
                        </button>
                    </form>
                    <p className={"mt-5"}>Bist du neu hier?  <button
                        className={"hover:cursor-pointer text-blue-700"}
                        onClick={() => navigate("/Testprojekte/2-SignUp")}>
                        Registrieren
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
