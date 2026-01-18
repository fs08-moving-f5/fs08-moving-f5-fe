'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HTTPError } from 'ky';
import { api } from '@/shared/api/client';
import { showToast } from '@/shared/ui/sonner';

type VerifyEmailResponse = {
  message: string;
  userType: 'USER' | 'DRIVER' | string;
};

export default function EmailVerifyPage() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (!token) {
        showToast({ kind: 'error', message: '인증 토큰이 없습니다.' });
        router.replace('/');
        return;
      }

      try {
        const result = await api.post<VerifyEmailResponse>('auth/email/verify', { token });
        const nextType = (result.data.userType || 'USER').toString().toLowerCase();

        showToast({ kind: 'success', message: result.data.message });
        router.replace(`/login/${nextType}?emailVerification=verified`);
      } catch (error) {
        if (error instanceof HTTPError) {
          const errorData = await error.response
            .json()
            .catch(() => ({ message: '이메일 인증에 실패했습니다.' }));

          showToast({ kind: 'error', message: errorData.message || '이메일 인증에 실패했습니다.' });
          router.replace('/');
          return;
        }

        showToast({
          kind: 'error',
          message: error instanceof Error ? error.message : '이메일 인증에 실패했습니다.',
        });
        router.replace('/');
      }
    };

    run();
  }, [router]);

  return null;
}
