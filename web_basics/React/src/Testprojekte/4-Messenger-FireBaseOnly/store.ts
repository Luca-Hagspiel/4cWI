import { create } from 'zustand';

type AuthStore = {
    isAuthenticated: boolean;
    setAuthTrue: () => void;
    setAuthFalse: () => void;
}

type PrivateChatStore = {
    isPrivateChatOpen: boolean;
    participants?: Array<string>;
    closePrivateChat: () => void;
    openPrivateChat: (user1:string, user2:string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    setAuthTrue: () => set({ isAuthenticated: true }),
    setAuthFalse: () => set({ isAuthenticated: false }),
}));

export const usePrivateChatStore = create<PrivateChatStore>((set, ) => ({
    isPrivateChatOpen: false,
    closePrivateChat: () => set({ isPrivateChatOpen: false }),
    openPrivateChat: (user1:string, user2:string) => {
        set({ isPrivateChatOpen: true })
        set({ participants: [user1, user2] })
    },
}));
