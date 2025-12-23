import { HTTPError } from 'ky';
import { api } from '@/shared/api/client';
import { SignupRequest, SignupResponse } from '../types/types';
import { useAuthStore } from '@/shared/store/authStore';

/**
 * 회원가입 API
 * @param data - 회원가입 요청 데이터 (type 필드 포함)
 * @returns 백엔드 응답: { user, accessToken }
 */
export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  try {
    const response = await api.post<SignupResponse>('auth/signup', data);
    const { user, accessToken } = response.data;

    useAuthStore.getState().setAuth(user, accessToken);

    return response.data;
  } catch (error) {
    // ky 에러 처리
    if (error instanceof HTTPError) {
      const errorData = await error.response
        .json()
        .catch(() => ({ message: '회원가입에 실패했습니다.' }));
      throw new Error(errorData.message || '회원가입에 실패했습니다.');
    }
    throw new Error('회원가입 중 오류가 발생했습니다.');
  }
};

export const socialLogin = async (provider: 'google' | 'kakao' | 'naver'): Promise<void> => {
  // TODO: SNS 로그인 구현
  console.log(`${provider} 로그인 요청`);
  // OAuth 리다이렉트 처리
  // window.location.href = `/api/auth/${provider}`;
};
