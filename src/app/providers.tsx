'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/shared/store/authStore';
import { getQueryClient } from '@/shared/lib/queryClient';
import { initKakao } from '@/shared/lib/initKakao';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const initAuth = useAuthStore((state) => state.initAuth);
  const [queryClient] = useState(() => getQueryClient());

  useEffect(() => {
    initAuth();

    initKakao();
  }, [initAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
