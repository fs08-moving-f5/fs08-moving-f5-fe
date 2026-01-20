'use client';

import Image from 'next/image';
import { ShareProps } from '@/shared/types/share';
import { showToast } from '@/shared/ui/sonner';

const ShareButton = (props: ShareProps) => {
  const { size = 'lg' } = props;

  const baseStyles = `flex cursor-pointer items-center justify-center p-[14px] rounded-[16px] border border-none transition`;

  const getWrapperClasses = () => {
    switch (size) {
      case 'lg':
        return 'w-[64px] h-[64px]';
      case 'md':
        return 'w-[54px] h-[54px]';
      case 'sm':
        return 'w-[40px] h-[40px]';
      default:
        return 'w-[64px] h-[64px]';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'lg':
        return { width: 28, height: 28 };
      case 'md':
      case 'sm':
        return { width: 24, height: 24 };
      default:
        return { width: 28, height: 28 };
    }
  };

  const getStyleByType = () => {
    if (props.platform === 'facebook') {
      return {
        bg: 'bg-[var(--color-primary-orange-400)]',
        src: '/icons/Facebook.svg',
        alt: 'facebook icon',
      };
    }

    // kakao default
    return {
      bg: 'bg-[#FAE100]',
      src: '/icons/Kakao.svg',
      alt: 'kakao icon',
    };
  };

  const { bg, src, alt } = getStyleByType();

  const shareFacebook = () => {
    const url = window.location.href;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const shareKakao = (props: Extract<ShareProps, { platform: 'kakao' }>) => {
    const { driverId } = props;

    if (!window.Kakao || !window.Kakao.isInitialized()) {
      showToast({
        kind: 'error',
        message: '카카오 공유를 사용할 수 없습니다.',
      });
      return;
    }

    const shareUrl = `${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}/drivers/${driverId}`;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '무빙 기사 프로필',
        description: '믿을 수 있는 기사의 프로필을 확인하세요',
        imageUrl: 'img.png',
        link: {
          webUrl: shareUrl,
          mobileWebUrl: shareUrl,
        },
      },
    });
  };

  const onShare = () => {
    if (props.platform === 'facebook') {
      shareFacebook();
    } else {
      shareKakao(props);
    }
  };

  return (
    <button
      type="button"
      aria-label={`${props.platform} 공유`}
      className={`${baseStyles} ${getWrapperClasses()} ${bg}`}
      onClick={onShare}
    >
      <Image src={src} alt={alt} width={getIconSize().width} height={getIconSize().height} />
    </button>
  );
};

export default ShareButton;
