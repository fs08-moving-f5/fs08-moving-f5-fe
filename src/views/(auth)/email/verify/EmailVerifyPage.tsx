'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { api } from '@/shared/api/client';
import { showToast } from '@/shared/ui/sonner';
import { EMAIL_VERIFICATION } from '@/features/auth/constants/emailVerification.constants';

export default function EmailVerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const run = async () => {
      const token = searchParams.get('token');

      if (!token) {
        showToast({ kind: 'error', message: '인증 토큰이 없습니다.' });
        router.replace('/');
        return;
      }

      try {
        const res = await api.post<{ type: 'USER' | 'DRIVER' }>('auth/verify-email', { token });

        showToast({ kind: 'success', message: EMAIL_VERIFICATION.TOAST_MESSAGE_VERIFIED });
        router.replace(`/login/${res.data.type.toLowerCase()}`);
      } catch (error) {
        const message = error instanceof Error ? error.message : '이메일 인증에 실패했습니다.';
        showToast({ kind: 'error', message });
        router.replace('/');
      }
    };

    run();
  }, [router, searchParams]);

  return null;
}
