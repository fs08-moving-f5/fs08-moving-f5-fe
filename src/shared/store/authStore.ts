import { create } from 'zustand';
import { storage } from '../lib/storage';
import { api } from '../api/client';

import type { UserResponse, RefreshData } from '../types/user';

interface AuthState {
  user: UserResponse | null;
  isUserLoaded: boolean;
  setUser: (user: UserResponse) => void;
  clearUser: () => void;
  markUserLoaded: () => void;
  setAuth: (user: UserResponse, accessToken: string) => void;
  clearAuth: () => void;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isUserLoaded: false,

  setUser: (user) => set({ user, isUserLoaded: true }),
  clearUser: () => set({ user: null, isUserLoaded: false }),
  markUserLoaded: () => set({ isUserLoaded: true }),

  // 로그인/회원가입 시 호출 (토큰은 로컬스토리지, 유저는 메모리만)
  setAuth: (user, accessToken) => {
    storage.setString('accessToken', accessToken);
    set({ user, isUserLoaded: true });
  },

  // 로그아웃 시 호출
  clearAuth: () => {
    storage.remove('accessToken');
    set({ user: null, isUserLoaded: true });
  },

  // 앱 시작 시 토큰 확인 및 갱신
  initAuth: async () => {
    const accessToken = storage.getString('accessToken');

    // accessToken이 있으면 바로 유저 정보 가져오기
    if (accessToken) {
      try {
        const response = await api.get<UserResponse>('auth/me');
        set({ user: response.data, isUserLoaded: true });
        return;
      } catch (error) {
        console.log(error);
      }
    }

    // accessToken이 없거나 만료된 경우, refreshToken으로 갱신 시도
    try {
      const refreshResponse = await api.post<RefreshData>('auth/refresh');

      if (refreshResponse.data?.accessToken) {
        // 새 accessToken 저장
        storage.setString('accessToken', refreshResponse.data.accessToken);

        // 유저 정보 가져오기
        const userResponse = await api.get<UserResponse>('auth/me');
        set({ user: userResponse.data, isUserLoaded: true });
        return;
      }
    } catch (error) {
      console.log(error);
    }

    // 모든 시도가 실패하면 비로그인 상태
    set({ user: null, isUserLoaded: true });
  },
}));
