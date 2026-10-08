import { create } from "zustand";
import type { SignUpData } from "@/types/auth";

type AuthUser = Pick<SignUpData, "name" | "email">;

type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;

  setAuth: (user: AuthUser) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  setAuth: (user) =>
    set({
      isAuthenticated: true,
      user,
    }),

  clearAuth: () =>
    set({
      isAuthenticated: false,
      user: null,
    }),
}));
