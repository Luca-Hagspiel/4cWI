import { useState } from "react";

const FirstLogin = () => {
    const [username, setUsername] = useState("");
    const [uid, setUid] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Username:", username, "UID:", uid);
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-900 text-white px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-xl shadow-lg w-full sm:w-96 md:w-[480px] flex flex-col gap-6"
            >
                <h2 className="text-2xl font-bold text-center mb-4">Username</h2>

                <div className="flex gap-4 items-end">
                    <label className="flex-1 flex flex-col text-sm font-medium">
                        Username
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-2 p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                            placeholder="Username"
                        />
                    </label>

                    <label className="flex flex-col text-sm font-medium">
                        UID
                        <input
                            type="text"
                            value={uid}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                                setUid(val);
                            }}
                            className="mt-2 p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-20 text-base"
                            placeholder="0000"
                        />
                    </label>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition text-base"
                >
                    Speichern
                </button>
            </form>
        </div>
    );
};

export default FirstLogin;
