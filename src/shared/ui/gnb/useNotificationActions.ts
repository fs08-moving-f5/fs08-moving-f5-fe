import { useRouter } from 'next/navigation';

export enum NotificationType {
  REQUEST_SENT = 'REQUEST_SENT',
  REQUEST_REJECTED = 'REQUEST_REJECTED',
  REQUEST_CANCELLED = 'REQUEST_CANCELLED',
  ESTIMATE_RECEIVED = 'ESTIMATE_RECEIVED',
  ESTIMATE_CONFIRMED = 'ESTIMATE_CONFIRMED',
  ESTIMATE_REJECTED = 'ESTIMATE_REJECTED',
  ESTIMATE_EXPIRED = 'ESTIMATE_EXPIRED',
  NEW_REVIEW = 'NEW_REVIEW',
}

export const useNotificationActions = () => {
  const router = useRouter();

  const handleNotificationAction = ({
    notificationType,
    datajson,
  }: {
    notificationType?: NotificationType;
    datajson?: Record<string, string>;
  }) => {
    if (!notificationType) return;

    switch (notificationType) {
      case NotificationType.REQUEST_SENT:
        break;
      case NotificationType.REQUEST_REJECTED:
        break;
      case NotificationType.REQUEST_CANCELLED:
        break;
      case NotificationType.ESTIMATE_RECEIVED:
        router.push('/user/my/estimates/pending');
        break;
      case NotificationType.ESTIMATE_CONFIRMED:
        console.log('datajson', datajson);
        console.log('datajson?.estimateId', datajson?.estimateId);
        const estimateId = datajson?.estimateId;
        router.push(`/driver/my/requests/confirmed/${estimateId}`);
        break;
      case NotificationType.ESTIMATE_REJECTED:
        break;
      case NotificationType.ESTIMATE_EXPIRED:
        break;
      case NotificationType.NEW_REVIEW:
        router.push('/driver/profile');
        break;
      default:
        break;
    }
  };

  return { handleNotificationAction };
};
