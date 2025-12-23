'use client';

import { notFound, useParams } from 'next/navigation';
import ReceivedEstimateDetailPageClient from '@/views/my/estimates/received/estimateId';

const ReceivedEstimateDetailPage = () => {
  const params = useParams<{ estimateId: string }>();

  if (!params) {
    return notFound();
  }

  return <ReceivedEstimateDetailPageClient estimateId={params.estimateId} />;
};

export default ReceivedEstimateDetailPage;
