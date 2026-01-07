'use client';

import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/store/authStore';
import { useNotificationStore } from '@/shared/store/notificationStore';
import { useNotificationSse } from '@/shared/hooks/useNotificationSse';

export const NotificationSseProvider = () => {
  const user = useAuthStore((state) => state.user);
  const setHasUnread = useNotificationStore((state) => state.setHasUnread);
  const queryClient = useQueryClient();
  const prevCountRef = useRef<number | null>(null);

  useNotificationSse({
    isLoggedIn: !!user,
    onUnreadCount: (count) => {
      const hasUnread = count > 0;
      setHasUnread(hasUnread);

      // 알림 개수가 변경되었고, 이전 개수보다 증가한 경우 notifications 목록 refetch
      if (prevCountRef.current !== null && count > prevCountRef.current) {
        queryClient.invalidateQueries({ queryKey: ['notification'] });
      }
      prevCountRef.current = count;
    },
  });

  return null;
};
