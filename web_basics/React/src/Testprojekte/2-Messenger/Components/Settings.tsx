import { useState } from "react";


//@ts-ignore
export default function Settings({ onClose, handleLogout, username }) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadMessage, setUploadMessage] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            // Maximal 10 MB
            if (file.size > 10 * 1024 * 1024) {
                setUploadMessage("Datei ist zu groß (max. 10 MB)");
                setSelectedFile(null);
                return;
            }

            // Nur erlaubte Formate
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/bmp"];
            if (!allowedTypes.includes(file.type)) {
                setUploadMessage("Nur Bilder im Format JPG, PNG, GIF, WebP oder BMP erlaubt");
                setSelectedFile(null);
                return;
            }

            setSelectedFile(file);
            setUploadMessage("");
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return setUploadMessage("Keine Datei ausgewählt");

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const res = await fetch(`http://localhost:3000/file/upload/${username}`, {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            if (res.ok) {
                setUploadMessage(`Erfolgreich hochgeladen: ${data.filename}`);
            } else {
                setUploadMessage(`Fehler: ${data.error}`);
            }
        } catch (err) {
            setUploadMessage("Fehler beim Hochladen");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="absolute inset-0 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative bg-gray-800 w-4/5 max-w-3xl h-4/5 rounded-xl shadow-2xl border border-gray-700 p-6 z-10">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                >
                    ✕
                </button>

                <h2 className="text-white text-2xl font-semibold mb-6">Einstellungen</h2>

                <div className="flex flex-col gap-4 text-gray-300">
                    <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.gif,.webp,.bmp"
                        onChange={handleFileChange}
                        className="text-gray-300"
                    />
                    <button
                        onClick={handleUpload}
                        className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Datei hochladen
                    </button>
                    {uploadMessage && (
                        <p className="text-sm text-gray-200">{uploadMessage}</p>
                    )}

                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Abmelden
                    </button>
                </div>
            </div>
        </div>
    );
}
