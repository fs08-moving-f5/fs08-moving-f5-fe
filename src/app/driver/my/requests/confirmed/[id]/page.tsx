import type { Metadata } from 'next';
import EstimateConfirmDetailPage from '@/views/driver/my/requests/confirmed/detail/ConfirmDetailPage';
import {getConfirmDetailEstimates} from '@/features/driver-estimate/services/driverEstimate.service'

type PageProps = {
  params: { id: string };
};

const ConfirmsDetailPage = ({ params }: PageProps) => {
  return <EstimateConfirmDetailPage estimateId={params.id} />;
};

export default ConfirmsDetailPage;

// 견적 상세 공유 메타데이터
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const estimateId = params.id;

  const data = await getConfirmDetailEstimates(estimateId);

  if (!data) {
    return {
      title: '견적 상세',
      description: '이사 견적 상세 정보를 확인하세요',
    };
  }

  const {
    customerName,
    pickupAddress,
    dropoffAddress,
    estimatePrice,
    movingDate,
  } = data;

  const title = `${customerName} 고객님 견적서 | 무빙`;
  const description = `${pickupAddress} → ${dropoffAddress}, ${estimatePrice.toLocaleString()}원`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_WEB_URL}/default-estimate-share.png`,
          width: 1200,
          height: 630,
        },
      ],
      url: `${process.env.NEXT_PUBLIC_WEB_URL}/driver/my/requests/confirmed/${estimateId}`,
    },
  };
}