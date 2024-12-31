import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: null | string;
  bio: null | string;
  profile_picture: null | string;
  role: string;
}

interface Tokens {
  access: string;
  refresh: string;
}

interface Admin {
  name: string;
  email: string;
  phone: null | string;
  role: string;
}

interface AuthState {
  admin: Admin | null;
  user: User | null;
  tokens: Tokens | null;
  setUser: (user: User) => void;
  setTokens: (tokens: Tokens) => void;
  setAdmin: (admin: Admin) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      admin: null,
      setUser: (user: User) => set({ user }),
      setTokens: (tokens: Tokens) => set({ tokens }),
      setAdmin: (admin: Admin) => set({ admin }),
      clearAuth: () => set({ user: null, tokens: null, admin: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        tokens: state.tokens,
      }),
    }
  )
);
