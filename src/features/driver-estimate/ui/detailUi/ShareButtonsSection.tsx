'use client';

import { Clip, ShareButton } from '@/shared/ui/button';

interface ShareButtonsSectionProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  link?: string;
  heading?: string;
}

const ShareButtonsSection = ({
  title = '이 페이지의 제목',
  description = '이 페이지 설명',
  imageUrl = 'https://example.com/thumb.png',
  link = 'https://example.com/page',
  heading = '공유하기',
}: ShareButtonsSectionProps) => {
  return (
    <section className="flex w-full flex-col gap-[22px] lg:w-auto">
      <h1 className="text-xl font-semibold text-[var(--color-black-500)]">{heading}</h1>

      <div className="flex gap-4">
        <Clip size="lg" />
        <ShareButton
          size="lg"
          platform="kakao"
          kakaoTitle={title}
          kakaoDescription={description}
          kakaoImageUrl={imageUrl}
          kakaoLink={link}
        />
        <ShareButton size="lg" platform="facebook" />
      </div>
    </section>
  );
};

export default ShareButtonsSection;
