import React, { useState } from "react";
import Inputs from "./Components/Inputs";

export default function App() {
    const [formData, setFormData] = useState({
        vorname: "",
        nachname: "",
        email: "",
        passwort: "",
        passwortWiederholen: ""
    });

    const [errors, setErrors] = useState({
        vorname: "",
        nachname: "",
        email: "",
        passwort: "",
        passwortWiederholen: ""
    });

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const validateField = (field: string, value: string) => {
        let error = "";

        if ((field === "vorname" || field === "nachname") && !value) error = "Dieses Feld darf nicht leer sein";
        if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Ungültige E-Mail";
        if (field === "passwort" && value.length < 8) error = "Mindestens 8 Zeichen";
        if (field === "passwortWiederholen" && value !== formData.passwort) error = "Passwörter stimmen nicht überein";

        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Object.values(errors).some(err => err) || Object.values(formData).some(f => !f)) {
            alert("Bitte alle Felder korrekt ausfüllen!");
            return;
        }

        const { passwortWiederholen, ...dataToSend } = formData;

        await fetch("http://localhost:3001/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSend)
        });

        alert("Daten gespeichert!");
        setFormData({ vorname: "", nachname: "", email: "", passwort: "", passwortWiederholen: "" });
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-xl p-8 shadow-lg w-100">
                <h1 className="text-3xl font-bold text-center mb-4">Herzlich Willkommen!</h1>
                <p className="text-center  text-gray-600 mb-8">Bitte füllen Sie die Textfelder aus</p>

                <Inputs type="text" placeholder="Vorname" value={formData.vorname} onChange={e => handleChange("vorname", e.target.value)} error={errors.vorname} />
                <Inputs type="text" placeholder="Nachname" value={formData.nachname} onChange={e => handleChange("nachname", e.target.value)} error={errors.nachname} />
                <Inputs type="email" placeholder="E-Mail Adresse" value={formData.email} onChange={e => handleChange("email", e.target.value)} error={errors.email} />
                <Inputs type="password" placeholder="Passwort" value={formData.passwort} onChange={e => handleChange("passwort", e.target.value)} error={errors.passwort} />
                <Inputs type="password" placeholder="Passwort wiederholen" value={formData.passwortWiederholen} onChange={e => handleChange("passwortWiederholen", e.target.value)} error={errors.passwortWiederholen} />

                <button type="submit" className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors">
                    Submit
                </button>

                <button
                    type="button"
                    onClick={() => window.open("http://localhost:3001/api/users", "_blank")}
                    className="mt-4 w-full bg-green-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors"
                >
                    Gespeicherte Daten anzeigen
                </button>
            </form>
        </div>
    );
}
