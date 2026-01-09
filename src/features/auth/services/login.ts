import { HTTPError } from 'ky';
import { api } from '@/shared/api/client';
import { useAuthStore } from '@/shared/store/authStore';

import type { LoginData } from '@/shared/types/user';
import type { LoginFormData, LoginResponse, UserType } from '../types/types';

/**
 * 로그인 API
 * @param formData - 로그인 폼 데이터
 * @param userType - 사용자 타입 (USER | DRIVER)
 * @returns 백엔드 응답: { user, accessToken }
 */
export const loginService = async (
  formData: LoginFormData,
  userType: UserType,
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginData>('auth/login', {
      email: formData.email,
      password: formData.password,
      type: userType,
    });

    const { user, accessToken } = response.data;
    useAuthStore.getState().setAuth(user, accessToken);

    return response.data;
  } catch (error) {
    // ky 에러 처리
    if (error instanceof HTTPError) {
      const errorData = await error.response
        .json()
        .catch(() => ({ message: '로그인에 실패했습니다.' }));
      throw new Error(errorData.message || '로그인에 실패했습니다.');
    }
    throw new Error('로그인 중 오류가 발생했습니다.');
  }
};

export type { LoginResponse };
