'use client';

import { notFound, useParams } from 'next/navigation';
import ReceivedEstimateDetailPageClient from '@/views/my/estimates/received/estimateId';

// 3279a51a-1a1d-4d51-b8fa-d149857149d0
const ReceivedEstimateDetailPage = () => {
  const params = useParams<{ estimateId: string }>();

  if (!params) {
    return notFound();
  }

  return <ReceivedEstimateDetailPageClient estimateId={params.estimateId} />;
};

export default ReceivedEstimateDetailPage;
