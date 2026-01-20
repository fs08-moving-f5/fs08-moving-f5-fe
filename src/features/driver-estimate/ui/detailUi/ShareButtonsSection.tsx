'use client';

import { Clip, ShareButton } from '@/shared/ui/button';

interface ShareButtonsSectionProps {
  id: string;
  heading?: string;
}

const ShareButtonsSection = ({ id, heading = '공유하기' }: ShareButtonsSectionProps) => {
  return (
    <section className="flex w-full flex-col gap-[22px] lg:w-auto">
      <h1 className="text-xl font-semibold text-[var(--color-black-500)]">{heading}</h1>

      <div className="flex gap-4">
        <Clip size="lg" />
        <ShareButton size="lg" platform="kakao" driverId={id} />
        <ShareButton size="lg" platform="facebook" />
      </div>
    </section>
  );
};

export default ShareButtonsSection;
