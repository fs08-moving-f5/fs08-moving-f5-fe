'use client';

import Image from 'next/image';

import type { MyPageData } from '@/features/profile/types/types';

interface MyPageDriverInfoSectionProps {
  profile: MyPageData['profile'];
}

const MyPageDriverInfoSection = ({ profile }: MyPageDriverInfoSectionProps) => {
  return (
    <section className="mb-8">
      <div className="flex flex-row items-center gap-2">
        <Image
          src={profile.imageUrl || '/img/profile.png'}
          alt="profileImg"
          width={80}
          height={80}
          className="mb-4 h-[80px] w-[80px] rounded-[12px] object-cover"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Image src="/icons/name.svg" alt="이름 아이콘" width={20} height={20} />
            <h2 className="text-xl font-semibold">{profile.name}</h2>
          </div>
          <div className="flex items-center">
            <Image src="/icons/like-empty.svg" alt="찜 아이콘" width={20} height={20} />
            <span className="text-gray-600">{profile.favoritedCount}</span>
          </div>
        </div>
      </div>

      {profile.shortIntro && (
        <p className="text-black-300 mb-4 font-semibold">{profile.shortIntro}</p>
      )}

      {profile.description && (
        <p className="mb-4 whitespace-pre-wrap text-gray-700">{profile.description}</p>
      )}
    </section>
  );
};

export default MyPageDriverInfoSection;
