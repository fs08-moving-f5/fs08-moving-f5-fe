import { api } from '@/shared/api/client';
import type { NotificationType } from './useNotificationActions';

export type GetNotificationListResponse = {
  id: string;
  type: NotificationType;
  message: string;
  isRead: boolean;
  datajson: Record<string, string>;
  createdAt: string;
};

export const getNotificationList = async () => {
  const res = await api.get<GetNotificationListResponse[]>('notifications');
  return res.data;
};

export const readNotification = async (id: string) => {
  const res = await api.patch(`notifications/${id}`);
  return res.data;
};
