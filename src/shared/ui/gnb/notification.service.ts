import { api } from '@/shared/api/client';
import type { paths } from '@/shared/types/openapi';

type getNotificationListResponse =
  paths['/api/notifications']['get']['responses']['200']['content']['application/json'];

export const getNotificationList = async () => {
  const res = await api.get<getNotificationListResponse['data']>('notifications');
  return res.data;
};

export type Notification = NonNullable<getNotificationListResponse['data']>[number];
