import { QueryClient } from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5분
        gcTime: 1000 * 60 * 30, // 30분 (구 cacheTime)
        refetchOnWindowFocus: false,
        retry: 1,
      },
      mutations: {
        retry: 1,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // 서버: 새로운 QueryClient를 매번 생성
    return makeQueryClient();
  } else {
    // 브라우저: QueryClient를 재사용 (싱글톤)
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

// 기존 코드 호환성을 위한 export (deprecated - getQueryClient 사용 권장)
export const queryClient = typeof window !== 'undefined' ? getQueryClient() : makeQueryClient();
