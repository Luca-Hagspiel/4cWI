import {useOpenUserInterfaceStore, usePrivateChatStore} from "../store";
import {FiUserPlus, FiX} from "react-icons/fi";
import useGetStatusLastSeen from "../Hooks/useGetStatusLastSeen.ts";

export type UserPreview = {
    id: string;
    displayName: string;
    username: string;
    profilepicture?: string;
    status?: "online" | "offline";
    bio?: string;
    mutualFriends?: number;
    createdAt?: string;
};

type Props = {
    userData: UserPreview;
};


const OpenUserInterface = ({ userData }: Props) => {
    const openPrivateChat = usePrivateChatStore((state) => state.openPrivateChat);
    const hideOpenUI = useOpenUserInterfaceStore((state) => state.hideOpenUI);

    const formatDate = (d?: Date) => {
        if (!d) return undefined;
        return d.toLocaleDateString("de-DE");
    };

    const u: UserPreview = {
        id: userData.id,
        displayName: userData.displayName,
        username: userData.username,
        profilepicture: userData.profilepicture,
        status: useGetStatusLastSeen(userData.id),
        bio: "Frontend Developer • React & TypeScript • Kaffeeliebhaber",
        mutualFriends: 0,
        // @ts-ignore
        createdAt: formatDate(userData.createdAt),
    };

    const statusColor =
        u.status === "online" ? "bg-green-400" : u.status === "offline" ? "bg-gray-400" : "bg-gray-400";

    return (
        <>
            <div className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40" />

            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none px-4">
                <div className="bg-gray-800/90 text-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 pointer-events-auto relative">
                    <div className="flex gap-6">
                        <div className="flex-shrink-0">
                            <div className="w-36 h-36 rounded-xl overflow-hidden bg-gray-700 flex items-center justify-center">
                                {u.profilepicture ? (
                                    <img src={u.profilepicture} alt={u.displayName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-200">
                                        <span className="text-2xl font-semibold">
                                            {u.displayName}
                                        </span>
                                        <span className="text-xs mt-1 text-gray-300">Profilbild</span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-3 text-center">
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusColor} text-black`}>
                                    {u.status}
                                </div>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">{u.displayName}</h2>
                                    <p className="text-sm text-gray-400">{u.username}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => console.log(userData)}
                                        className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-lg"
                                    >
                                        <FiUserPlus className={"text-xl"}/>
                                    </button>

                                    <button
                                        onClick={() => hideOpenUI()}
                                        aria-label="Schließen"
                                        className="text-gray-400 hover:text-white transition ml-1 text-2xl"
                                    >
                                        <FiX />
                                    </button>
                                </div>
                            </div>

                            <p className="mt-4 text-gray-300">{u.bio}</p>

                            <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
                                <div className="bg-gray-800/60 p-3 rounded-lg text-center">
                                    <div className="text-xs text-gray-400">Mutual</div>
                                    <div className="font-semibold text-lg">{u.mutualFriends}</div>
                                </div>
                                <div className="bg-gray-800/60 p-3 rounded-lg text-center">
                                    <div className="text-xs text-gray-400">Beigetreten</div>
                                    <div className="font-semibold text-lg">{u.createdAt}</div>
                                </div>
                                <div className="bg-gray-800/60 p-3 rounded-lg text-center">
                                    <div className="text-xs text-gray-400">Status</div>
                                    <div className="font-semibold text-lg">{u.status}</div>
                                </div>
                            </div>


                            <div className="mt-6 flex items-center gap-3">
                                <button
                                    onClick={() => {
                                        openPrivateChat("", u.id);
                                        hideOpenUI();
                                    }}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-sm"
                                >
                                    Private Chat öffnen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OpenUserInterface;
