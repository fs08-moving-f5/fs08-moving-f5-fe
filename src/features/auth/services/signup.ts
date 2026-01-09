import { HTTPError } from 'ky';
import { api } from '@/shared/api/client';
import { useAuthStore } from '@/shared/store/authStore';

import type { SignupData } from '@/shared/types/user';
import type { SignupRequest, SignupResponse } from '../types/types';

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

  // new URL(relative, base)에서 base가 슬래시로 끝나지 않으면 마지막 세그먼트가 치환될 수 있어
  // prefixUrl(http://localhost:4000/api) 기준을 확실히 하기 위해 /로 끝나게 정규화
  const base = apiBase.endsWith('/') ? apiBase : `${apiBase}/`;

  // 콜백에서 실제 로그인된 타입과 비교하기 위해 저장
  sessionStorage.setItem('oauthExpectedUsertype', usertype);

  const url = new URL(`auth/oauth/${provider}`, base);
  url.searchParams.set('type', usertype);
  // 백엔드가 OAuth 콜백 시 이 도메인으로 리다이렉트하도록 전달
  url.searchParams.set('redirectOrigin', window.location.origin);

  window.location.href = url.toString();
};
