'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/shared/store/authStore';
import { showToast } from '@/shared/ui/sonner';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

interface LoginedGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function AuthGuard({ children, redirectTo = '/login/user' }: AuthGuardProps) {
  const { user, isUserLoaded } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 유저 정보 로딩이 완료되고 유저가 없으면 로그인 페이지로
    if (isUserLoaded && !user) {
      showToast({ kind: 'warning', message: '로그인이 필요합니다.' });
      // 현재 경로를 쿼리 파라미터로 저장 (로그인 후 돌아오기 위해)
      const returnUrl = encodeURIComponent(pathname || '/');
      router.replace(`${redirectTo}?returnUrl=${returnUrl}`);
    }
  }, [user, isUserLoaded, router, pathname, redirectTo]);

  // 로딩 중
  if (!isUserLoaded) {
    return null;
  }
  // 인증됨
  return <>{children}</>;
}

export function LoginedGuard({ children, redirectTo = '/' }: LoginedGuardProps) {
  const { user, isUserLoaded } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 유저 정보 로딩이 완료되고 유저가 있으면 리다이렉트
    if (isUserLoaded && user) {
      router.replace(redirectTo);
    }
  }, [user, isUserLoaded, router, pathname, redirectTo]);

  // 로딩 중
  if (!isUserLoaded) {
    return null;
  }
  // 비인증됨
  return <>{children}</>;
}

export default AuthGuard;
