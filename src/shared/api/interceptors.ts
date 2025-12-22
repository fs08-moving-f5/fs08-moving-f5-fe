import { BeforeRequestHook, BeforeRetryHook, HTTPError } from 'ky';
import ky from 'ky';
import { storage } from '@/shared/lib/storage';
import { useAuthStore } from '@/shared/store/authStore';

// 토큰 갱신용 별도 클라이언트 (인터셉터 없음)
const refreshClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10 * 1000,
  credentials: 'include',
  retry: 0, // 재시도 없음
});

// 동시 다발적 요청 처리를 위한 상태 관리
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};


async function refreshAccessToken(): Promise<string> {
  const data = await refreshClient
    .post('api/auth/refresh')
    .json<{ success: boolean; data: { accessToken: string } }>();
  
  if (data.success && data.data.accessToken) {
    storage.setString('accessToken', data.data.accessToken);
    console.log('Access token 갱신 성공');
    return data.data.accessToken;
  } else {
    throw new Error('토큰 갱신 응답 오류');
  }
}

const setAuthorizationHeader: BeforeRequestHook = async (request) => {
  const accessToken = storage.getString('accessToken');

  // 토큰이 있으면 헤더에 추가
  if (accessToken) {
    request.headers.set('Authorization', `Bearer ${accessToken}`);
  }
};

const handleToken: BeforeRetryHook = async ({ error, request }) => {
  const httpError = error as HTTPError;
  
  // 401이 아닌 경우 재시도 중지
  if (httpError.response?.status !== 401) {
    return;
  }
  
  // 동시 다발적 요청 처리 - 이미 갱신 중이면 대기
  if (isRefreshing) {
    return new Promise<void>((resolve) => {
      refreshSubscribers.push((token: string) => {
        request.headers.set('Authorization', `Bearer ${token}`);
        resolve();
      });
    });
  }
  
  isRefreshing = true;
  
  try {
    const newAccessToken = await refreshAccessToken();
    
    // 현재 요청의 헤더 업데이트
    request.headers.set('Authorization', `Bearer ${newAccessToken}`);
    
    // 대기 중인 모든 요청에 새 토큰 전달
    onRefreshed(newAccessToken);
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    // 토큰 갱신 실패 시 인증 정보만 삭제 (리다이렉트는 페이지 가드에서 처리)
    clearAuthData();
    throw error;
  } finally {
    isRefreshing = false;
  }
};

/**
 * 인증 정보 삭제 (로그아웃 또는 토큰 만료 시)
 */
const clearAuthData = () => {
  console.log('인증 정보 삭제');
  storage.remove('accessToken');
  useAuthStore.getState().clearAuth();
};

export { setAuthorizationHeader, handleToken, clearAuthData };
