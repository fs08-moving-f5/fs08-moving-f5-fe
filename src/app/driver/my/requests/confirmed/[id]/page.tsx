'use client';

import EstiamteConfirmDetailPage from '@/views/driver/my/requests/confirmed/detail/ConfirmDetailPage';
import { useParams, notFound } from 'next/navigation';

const ConfirmsDetailPage = () => {
  const params = useParams<{ id: string }>();

  if (!params) {
    return notFound();
  }

  if (!params.id) {
    return notFound();
  }

  return <EstiamteConfirmDetailPage estimateId={params.id} />;
};

export default ConfirmsDetailPage;
