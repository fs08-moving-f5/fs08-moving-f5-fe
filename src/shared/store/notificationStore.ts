import { create } from 'zustand';

interface NotificationStore {
  hasUnread: boolean;
  setHasUnread: (hasUnread: boolean) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  hasUnread: false,
  setHasUnread: (hasUnread) => set({ hasUnread }),
}));
