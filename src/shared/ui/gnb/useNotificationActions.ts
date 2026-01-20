import { useRouter } from 'next/navigation';

enum NotificationType {
  REQUEST_SENT = 'REQUEST_SENT',
  REQUEST_REJECTED = 'REQUEST_REJECTED',
  REQUEST_CANCELLED = 'REQUEST_CANCELLED',
  ESTIMATE_RECEIVED = 'ESTIMATE_RECEIVED',
  ESTIMATE_CONFIRMED = 'ESTIMATE_CONFIRMED',
  ESTIMATE_REJECTED = 'ESTIMATE_REJECTED',
  ESTIMATE_EXPIRED = 'ESTIMATE_EXPIRED',
  NEW_REVIEW = 'NEW_REVIEW',
}

export const useNotificationActions = ({
  notificationType,
  datajson
}: {
  notificationType: NotificationType;
  datajson?: Record<string, string>
}) => {
  const router = useRouter();

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
      const estimateId = datajson?.estimateId;
      router.push(`/driver/my/requests/confirmed/${estimateId}`)
      break;
    case NotificationType.ESTIMATE_REJECTED:
      break;
    case NotificationType.ESTIMATE_EXPIRED:
      break;
    case NotificationType.NEW_REVIEW:
      break;
    default:
      break;
  }
};
