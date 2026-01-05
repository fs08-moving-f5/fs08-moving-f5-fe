'use client';

import PendingEstimateDetailPageClient from '@/views/user/my/estimates/pending/estimateId';
import { notFound, useParams } from 'next/navigation';

const PendingEstimateDetailPage = () => {
  const params = useParams<{ estimateId: string }>();

  if (!params) {
    return notFound();
  }

  return <PendingEstimateDetailPageClient estimateId={params.estimateId} />;
};

export default PendingEstimateDetailPage;
