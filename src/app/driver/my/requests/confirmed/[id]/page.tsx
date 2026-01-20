'use client'

// import type { Metadata } from 'next';
import { useParams, notFound } from 'next/navigation';
import EstimateConfirmDetailPage from '@/views/driver/my/requests/confirmed/detail/ConfirmDetailPage';

// type PageProps = {
//   params: { id: string };
// };

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

// // 견적 상세 공유 메타데이터
// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const estimateId = params.id;

//   if (!estimateId) {
//     return {
//       title: '견적 상세',
//       description: '이사 견적 상세 정보를 확인하세요',
//     };
//   }

//   return {
//     title: '견적 상세',
//     description: '이사 견적 상세 정보를 확인하세요',
//     openGraph: {
//       url: `${process.env.NEXT_PUBLIC_WEB_URL}/driver/my/requests/confirmed/${estimateId}`,
//     },
//   };
// }
