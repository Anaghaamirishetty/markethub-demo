import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'user' | 'seller' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  phone?: string;
  businessName?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  activeRole: UserRole;
  activeUserData: User | null;
  login: (role: UserRole, userData: User) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      activeRole: null,
      activeUserData: null,
      login: (role, userData) =>
        set({
          isAuthenticated: true,
          activeRole: role,
          activeUserData: userData,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          activeRole: null,
          activeUserData: null,
        }),
      updateUser: (data) =>
        set((state) => ({
          activeUserData: state.activeUserData
            ? { ...state.activeUserData, ...data }
            : null,
        })),
    }),
    {
      name: 'markethub-auth',
    }
  )
);
