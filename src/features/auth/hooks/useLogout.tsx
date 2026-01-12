import { useAuthStore } from '@/shared/store/authStore';
import { api } from '@/shared/api/client';
import { showToast } from '@/shared/ui/sonner';
import { useRouter } from 'next/navigation';
import { getQueryClient } from '@/shared/lib/queryClient';

export const useLogout = () => {
  const router = useRouter();
  const { clearAuth } = useAuthStore();

  const handleLogout = async () => {
    try {
      // 백엔드 로그아웃 API 호출
      await api.post('auth/logout');

      // 클라이언트 상태 초기화
      clearAuth();
      // React Query 캐시 및 쿼리 초기화
      try {
        const qc = getQueryClient();
        qc.cancelQueries();
        qc.getQueryCache().clear();
        qc.getMutationCache().clear();
      } catch (e) {
        // ignore
      }

      showToast({ kind: 'success', message: '로그아웃되었습니다.' });
      router.push('/');
    } catch (error) {
      // 에러가 발생해도 클라이언트 상태는 초기화
      clearAuth();
      // React Query 초기화 시도 (에러 경로에서도)
      try {
        const qc = getQueryClient();
        qc.cancelQueries();
        qc.getQueryCache().clear();
        qc.getMutationCache().clear();
      } catch (e) {
        // ignore
      }
      showToast({ kind: 'error', message: '로그아웃 중 오류가 발생했습니다.' });
      router.push('/');
    }
  };

  return { handleLogout };
};
