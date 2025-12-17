'use client';

import { useAuthStore } from '@/shared/store/authStore';
import { useNotificationStore } from '@/shared/store/notificationStore';
import { useNotificationSse } from '@/shared/hooks/useNotificationSse';

export const NotificationSseProvider = () => {
  const user = useAuthStore((state) => state.user);
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);

  useNotificationSse({
    isLoggedIn: !!user,
    onUnreadCount: (count) => setUnreadCount(count),
  });

  return null;
};
