import { useMutation } from '@tanstack/react-query';
import { readNotification } from './notification.service';

export const useReadNotificationMutation = () => {
  return useMutation({
    mutationFn: readNotification,
  });
};
