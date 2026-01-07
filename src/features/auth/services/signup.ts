import { HTTPError } from 'ky';
import { api } from '@/shared/api/client';
import { SignupRequest, SignupResponse } from '../types/types';
import { SignupData } from '@/shared/types/user';
import { useAuthStore } from '@/shared/store/authStore';

/**
 * 회원가입 API
 * @param data - 회원가입 요청 데이터 (type 필드 포함)
 * @returns 백엔드 응답: { user, accessToken }
 */
export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  try {
    const response = await api.post<SignupData>('auth/signup', data);
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

export const socialLogin = async (
  provider: 'google' | 'kakao' | 'naver',
  usertype: 'USER' | 'DRIVER',
): Promise<void> => {
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  if (!apiBase) {
    throw new Error('NEXT_PUBLIC_API_URL이 설정되어 있지 않습니다.');
  }

  // 콜백에서 실제 로그인된 타입과 비교하기 위해 저장
  sessionStorage.setItem('oauthExpectedUsertype', usertype);

  const url = new URL(`auth/oauth/${provider}`, apiBase);
  url.searchParams.set('type', usertype);

  window.location.href = url.toString();
};
