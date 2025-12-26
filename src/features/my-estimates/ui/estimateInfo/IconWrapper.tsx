'use client';

import Image from 'next/image';
import { showToast } from '@/shared/ui/sonner';
import clsx from 'clsx';

const tabAndMobileStyles = 'tab:block mobile:block flex hidden w-full flex-col gap-3';
const desktopStyles = 'flex flex-col gap-[22px]';

const tabAndMobileTitleStyles = 'text-black-400 text-base leading-8 font-semibold';
const desktopTitleStyles = 'text-black-400 text-xl font-semibold';

const IconWrapper = ({ type }: { type: 'mobile' | 'desktop' }) => {
  const openSharePopup = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareToFacebook = () => {
    openSharePopup(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
    showToast({ kind: 'success', message: 'Facebook 공유가 완료되었습니다.' });
  };

  const shareToKakao = () => {
    openSharePopup(`https://developers.kakao.com/docs/latest/ko/message/js-link`);
    showToast({ kind: 'success', message: 'Kakao 공유가 완료되었습니다.' });
  };

  const shareToLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    showToast({ kind: 'success', message: '링크가 복사되었습니다.' });
  };

  return (
    <div className={clsx(type === 'mobile' ? tabAndMobileStyles : desktopStyles)}>
      <div className={clsx(type === 'mobile' ? tabAndMobileTitleStyles : desktopTitleStyles)}>
        견적서 공유하기
      </div>

      <div className="tab:gap-3 mobile:gap-3 flex items-center gap-4">
        <button type="button" className="cursor-pointer" onClick={shareToLink}>
          <Image
            src="/icons/share/link.svg"
            alt="ic-share"
            width={64}
            height={64}
            className="tab:w-10 tab:h-10 mobile:w-10 mobile:h-10 h-[64px] w-[64px]"
          />
        </button>
        <button type="button" className="cursor-pointer" onClick={shareToKakao}>
          <Image
            src="/icons/share/kakao.svg"
            alt="ic-share"
            width={64}
            height={64}
            className="tab:w-10 tab:h-10 mobile:w-10 mobile:h-10 h-[64px] w-[64px]"
          />
        </button>
        <button type="button" className="cursor-pointer" onClick={shareToFacebook}>
          <Image
            src="/icons/share/facebook.svg"
            alt="ic-share"
            width={64}
            height={64}
            className="tab:w-10 tab:h-10 mobile:w-10 mobile:h-10 h-[64px] w-[64px]"
          />
        </button>
      </div>
    </div>
  );
};

export default IconWrapper;
