import { create } from 'zustand';
import { storage } from '../lib/storage';
//TODO - authStore 구현
//TODO - accessToken 상태 제거 필요 (보안상 이슈). user 존재 여부로 로그인 상태 판단
interface User {
  id: string;
  email: string;
  name: string;
  // 필요한 사용자 정보 추가
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  setAuth: (user, accessToken) => {
    storage.setObject('user', user);
    storage.setString('accessToken', accessToken);
    set({ user, accessToken, isAuthenticated: true });
  },

  clearAuth: () => {
    storage.remove('user');
    storage.remove('accessToken');
    storage.remove('refreshToken');
    set({ user: null, accessToken: null, isAuthenticated: false });
  },

  initAuth: () => {
    const user = storage.getObject<User>('user');
    const accessToken = storage.getString('accessToken');
    if (user && accessToken) {
      set({ user, accessToken, isAuthenticated: true });
    }
  },
}));
