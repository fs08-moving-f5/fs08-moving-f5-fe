import { useQuery } from '@tanstack/react-query';
import { getNotificationList } from './notification.service';

export const useGetNotificationListQuery = () => {
  return useQuery({
    queryKey: ['notification'],
    queryFn: getNotificationList,
  });
};
