import { authMessenger, googleProviderMessenger } from './firebase-config.ts';
import { signInWithPopup } from 'firebase/auth';
import { useAuthStore } from '../store.ts';
import { useTranslation } from 'react-i18next';
import { db } from './firebase-config.ts';
import {doc, getDoc, setDoc} from "firebase/firestore";

const SignIn = () => {
    const { t, i18n } = useTranslation();

    const setAuthTrue = useAuthStore((state) => state.setAuthTrue);
    const setAuthFalse = useAuthStore((state) => state.setAuthFalse);


    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(authMessenger, googleProviderMessenger);
            const user = result.user;

            const safeDisplayName = user.displayName ? user.displayName.replace(/\s+/g, "_") : "user";
            const safeUid = user.uid.replace(/\s+/g, "");

            const docId = `${safeDisplayName}_${safeUid}`;

            const userDocRef = doc(db, "user", docId);
            const docSnap = await getDoc(userDocRef);

            if (!docSnap.exists()) {
                await setDoc(userDocRef, {
                    username: user.displayName,
                    profilepicture: user.photoURL,
                    uid: user.uid,
                });
            }

            setAuthTrue();
        } catch (error) {
            console.error("Error signing in with Google:", error);
            setAuthFalse();
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 shadow-xl rounded-2xl p-12 w-full max-w-md text-center">
                <h1 className="text-3xl font-bold text-white mb-6">{t('login.welcome')}</h1>
                <p className="text-gray-400 mb-8">
                    {t('login.login')}
                </p>

                <button
                    onClick={signInWithGoogle}
                    className="flex items-center justify-center w-full bg-white text-gray-900 font-semibold py-3 rounded-lg shadow-md transform transition-all duration-200 hover:bg-gray-100 hover:scale-105 hover:shadow-xlfocus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                        alt="Google"
                        className="w-6 h-6 mr-3"
                    />
                    {t('login.loginGoogle')}
                </button>
            </div>

            <div className="fixed bottom-4 right-4 flex gap-2">
                <button
                    onClick={() => i18n.changeLanguage('de')}
                    className="p-1"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg"
                        alt="AT Flag"
                        className="w-8 h-5 rounded-sm shadow"
                    />
                </button>

                <button
                    onClick={() => i18n.changeLanguage('en')}
                    className="p-1"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
                        alt="UK Flag"
                        className="w-8 h-5 rounded-sm shadow"
                    />
                </button>
            </div>

        </div>
    );
};

export default SignIn;
