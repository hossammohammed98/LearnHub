import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserData {
  id: string;
  FName: string;
  LName: string;
  Phone: string;
  Role: string;
  Email?: string;
  Avatar?: string;
}

interface AuthState {
  user: UserData | null;
  accessToken: string | null;
  hasHydrated: boolean;
  setUser: (user: UserData) => void;
  setAccessToken: (token: string | null) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      hasHydrated: false,
      setUser: (user) => set({ user }),
      setAccessToken: (token) => set({ accessToken: token }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      logout: () => set({ user: null, accessToken: null }),
    }),
    {
      name: "auth-storage", // Unique key for localStorage
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
