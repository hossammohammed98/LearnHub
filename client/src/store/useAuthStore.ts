import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserData {
  id: string;
  FName: string;
  LName: string;
  Phone: number;
  Role: string;
  Email?: string;
  parentProfileId?: string;
}

interface AuthState {
  user: UserData | null;
  setUser: (user: UserData) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // Unique key for localStorage
    }
  )
);