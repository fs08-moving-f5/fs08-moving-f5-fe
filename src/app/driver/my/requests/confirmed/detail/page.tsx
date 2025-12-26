'use client';

import EstiamteConfirmDetailPage from '@/views/driver/my/requests/confirmed/detail/ConfirmDetailPage';
import { useParams, notFound } from 'next/navigation';

const ConfirmsDetailPage = () => {
  const params = useParams<{ estimateId: string }>();

  if (!params) {
    return notFound();
  }

  return <EstiamteConfirmDetailPage estimateId={params.estimateId} />;
};

export default ConfirmsDetailPage;
