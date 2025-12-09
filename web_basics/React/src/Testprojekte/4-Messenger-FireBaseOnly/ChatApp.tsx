import {useAuthState} from "react-firebase-hooks/auth";
import {authMessenger} from "./Components/firebase-config";
import {useAuthStore} from "./store";
import SignIn from "./Components/SignIn.tsx";
import {useState} from "react";
import {FiSettings} from "react-icons/fi";
import Settings from "./Components/Settings.tsx";
import SignedUpUsers from "./Components/SignedUpUsers.tsx";


const ChatApp = () => {

    const IsAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [user] = useAuthState(authMessenger);

    const [Count, setCount] = useState(0);

    return (
        <div>
            {user || IsAuthenticated ? (
                <div>
                    {Count === 0 ? null : <Settings onClose={() => setCount(0)}/>}


                    <div className={"w-60 bg-gray-800 border-r border-gray-700 p-4 flex flex-col h-screen"}>

                        <SignedUpUsers/>

                        <div className="mt-auto flex items-center justify-between px-2 border-t border-gray-700 pt-4">
                            <div className="flex-1 flex items-center">
                                <img
                                    className="size-10 rounded-full mr-3"
                                    src={user?.photoURL || ''}
                                    alt="Profilbild"
                                />
                                {<span className="text-white mb-0">{user?.displayName}</span>}
                            </div>
                            <button
                                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-shadow shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={() => setCount(Count + 1)}
                                title="Einstellungen"
                            >
                                <FiSettings size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <SignIn/>
                )}
        </div>
    );
};

export default ChatApp;
