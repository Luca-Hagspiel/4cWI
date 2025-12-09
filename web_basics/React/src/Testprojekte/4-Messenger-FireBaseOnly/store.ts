import { create } from 'zustand';

type AuthStore = {
    isAuthenticated: boolean;
    setAuthTrue: () => void;
    setAuthFalse: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    setAuthTrue: () => set({ isAuthenticated: true }),
    setAuthFalse: () => set({ isAuthenticated: false }),
}));
