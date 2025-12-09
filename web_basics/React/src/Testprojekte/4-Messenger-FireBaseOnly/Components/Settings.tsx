import { authMessenger } from "./firebase-config.ts";
import { useAuthStore } from "../store.ts";
import { useTranslation } from "react-i18next";
import { FiGlobe, FiLogOut, FiUser, FiX } from "react-icons/fi";

interface Props {
    onClose?: () => void;
}

const Settings = ({ onClose }: Props) => {
    const { t, i18n } = useTranslation();

    const handleLogout = async () => {
        await authMessenger.signOut();
        useAuthStore.getState().setAuthFalse();
        window.location.reload();
    };

    return (
        <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-900">
            <div className="bg-gray-800 shadow-2xl rounded-2xl w-full max-w-3xl p-10 relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-400 hover:text-white text-2xl"
                >
                    <FiX />
                </button>

                {/* Title */}
                <h1 className="text-4xl font-bold text-white mb-8">{t("settings.title")}</h1>

                {/* SETTINGS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* SECTION 1 ---------------------- */}
                    <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600">
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <FiUser /> {t("settings.account")}
                        </h2>

                        <div className="flex flex-col gap-3 text-gray-300">
                            <p>{t("settings.accountInfo")}</p>

                            <button
                                onClick={handleLogout}
                                className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg font-medium shadow-md hover:bg-red-600 transition-all"
                            >
                                <FiLogOut className="inline-block mr-2" />
                                {t("settings.logout")}
                            </button>
                        </div>
                    </div>

                    {/* SECTION 2 ---------------------- */}
                    <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600">
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <FiGlobe /> {t("settings.language")}
                        </h2>

                        <p className="text-gray-300 mb-4">{t("settings.selectLanguage")}</p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => i18n.changeLanguage("de")}
                                className={`py-2 px-4 rounded-lg shadow-md transition-all ${
                                    i18n.language === "de"
                                        ? "bg-white text-gray-900"
                                        : "bg-gray-600 text-white hover:bg-gray-500"
                                }`}
                            >
                                🇦🇹 Deutsch
                            </button>

                            <button
                                onClick={() => i18n.changeLanguage("en")}
                                className={`py-2 px-4 rounded-lg shadow-md transition-all ${
                                    i18n.language === "en"
                                        ? "bg-white text-gray-900"
                                        : "bg-gray-600 text-white hover:bg-gray-500"
                                }`}
                            >
                                🇬🇧 English
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
