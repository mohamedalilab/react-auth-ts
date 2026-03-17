import { User } from "@/types";
import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  presist: boolean;
  setAuth: (data: Partial<Omit<AuthState, "setAuth">>) => void;
  logout: () => void;
}
const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  presist: false,
  setAuth: (data) => set((state) => ({ ...state, ...data })),
  isAdmin: () => get().user?.role === "admin",
  isAuthenticated: () => Boolean(get().user?.name),
  logout: () => set({ accessToken: null, user: null, presist: false }),
}));

export const selectUserData = (state: AuthState) => state.user;
export const selectSetAuth = (state: AuthState) => state.setAuth;
export const selectLogout = (state: AuthState) => state.logout;
export const selectPresist = (state: AuthState) => state.presist;
export const selectAccessToken = (state: AuthState) => state.accessToken;
export const selectIsAdmin = (state: AuthState) => state.user?.role === "admin";
export const selectIsAuthenticated = (state: AuthState) =>
  state.user && state.accessToken;

export default useAuthStore;
