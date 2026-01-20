import type { Metadata } from 'next';
import FindDriverDetailPage from '@/views/drivers/[id]/FindDriverDetailPage';
import { getDriverPublicProfile } from '@/features/profile/services/profileService'

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <FindDriverDetailPage id={id} disableFavorite={true} />;
}

// 카카오 공유 메타데이터
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const driverId = params.id;

  const data = await getDriverPublicProfile(driverId);

  if (!data || !data.driverProfile) {
    return {
      title: '기사 프로필',
      description: '무빙 기사 프로필을 확인하세요',
    };
  }

  const { name, driverProfile } = data;

  return {
    title: `${name} 기사 | 무빙`,
    description: driverProfile.shortIntro ?? '믿을 수 있는 이사 기사',
    openGraph: {
      title: `${name} 기사 | 무빙`,
      description: driverProfile.shortIntro ?? '',
      images: [
        {
          url: driverProfile.imageUrl ?? '/default-share.png',
          width: 1200,
          height: 630,
        },
      ],
      url: `${process.env.NEXT_PUBLIC_WEB_URL}/drivers/${driverId}`,
    },
  };
}