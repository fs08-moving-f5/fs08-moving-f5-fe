'use client';

import EstimateConfirmDetailPage from '@/views/driver/my/requests/confirmed/detail/ConfirmDetailPage';
import { useParams, notFound } from 'next/navigation';

const ConfirmsDetailPage = () => {
  const params = useParams<{ id: string }>();

  if (!params) {
    return notFound();
  }

  if (!params.id) {
    return notFound();
  }

  return <EstimateConfirmDetailPage estimateId={params.id} />;
};

export default ConfirmsDetailPage;
