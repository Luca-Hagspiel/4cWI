import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const aufgaben = [
    { path: "/Testprojekte/1-SignUp", name: "SignUp" },
    { path: "/Testprojekte/2-SignUp", name: "Messenger (unvollständig)" },
];

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-tr from-blue-200 via-teal-200 to-green-100 flex flex-col items-center py-16 px-4">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-12 tracking-wide drop-shadow-md">
                Aufgaben Übersicht
            </h1>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
                {aufgaben.map((aufgabe, index) => (
                    <motion.li
                        key={index}
                        whileHover={{ scale: 1.08, boxShadow: "0px 20px 40px rgba(0,0,0,0.15)" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="bg-white rounded-3xl shadow-md p-8 text-center cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
                    >
                        <Link
                            to={aufgabe.path}
                            className="text-xl font-semibold text-gray-700 hover:text-teal-600 transition-colors duration-300"
                        >
                            {aufgabe.name}
                        </Link>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};

export default App;
