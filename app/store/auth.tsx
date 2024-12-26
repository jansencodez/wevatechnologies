// store/auth.js
import { create } from "zustand";

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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  tokens: null,
  admin: null,
  setAdmin: (admin: Admin) => set({ admin }),
  setUser: (user: User) => set({ user }),
  setTokens: (tokens: Tokens) => set({ tokens }),
  clearAuth: () => set({ user: null, tokens: null }),
}));
