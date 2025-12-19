import { create } from 'zustand';
import { storage } from '../lib/storage';
import type { UserResponse } from '../types/user';

interface AuthState {
  user: UserResponse | null;
  isUserLoaded: boolean;
  setUser: (user: UserResponse) => void;
  clearUser: () => void;
  markUserLoaded: () => void;
  setAuth: (user: UserResponse, accessToken: string) => void;
  clearAuth: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isUserLoaded: false,

  setUser: (user) => set({ user, isUserLoaded: true }),
  clearUser: () => set({ user: null, isUserLoaded: false }),
  markUserLoaded: () => set({ isUserLoaded: true }),

  // 로그인/회원가입 시 호출 (토큰은 로컬스토리지, 유저는 상태)
  setAuth: (user, accessToken) => {
    storage.setString('accessToken', accessToken);
    set({ user, isUserLoaded: true });
  },

  // 로그아웃 시 호출
  clearAuth: () => {
    storage.remove('accessToken');
    storage.remove('refreshToken');
    set({ user: null, isUserLoaded: false });
  },

  // 앱 시작 시 토큰으로 유저 정보 복원 (API 호출 필요)
  initAuth: () => {
    const accessToken = storage.getString('accessToken');
    if (accessToken) {
      set({ isUserLoaded: false });
    } else {
      set({ user: null, isUserLoaded: true });
    }
  },
}));
