'use client';

import { useState } from 'react';
import Image from 'next/image';

interface LikeButtonProps {
  size?: 'lg' | 'md' | 'sm';
}

const LikeButton = ({ size = 'md' }: LikeButtonProps) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    if (loading) return;

    setLiked((prev) => !prev);

    try {
      setLoading(true);
      // 실제 API 호출
      // await fetch('/api/like', {
      //   method: 'POST',
      //   body: JSON.stringify({ liked: !liked }),
      // });
    } catch (err) {
      console.error(err);
      setLiked((prev) => !prev);
    } finally {
      setLoading(false);
    }
  };

  const baseStyles = `flex items-center justify-center rounded-[16px] border border-[var(--color-line-200)] bg-[var(--color-grayScale-50)] hover:bg-[var(--color-grayScale-100)] transition cursor-pointer`;

  const getWrapperClasses = () => {
    switch (size) {
      case 'lg':
        return 'max-w-[320px] min-h-[54px] gap-[8px] px-[16px]';
      case 'md':
        return 'w-[64px] h-[64px] p-[10px]';
      case 'sm':
        return 'w-[54px] h-[54px] p-[10px]';
      default:
        return 'w-[64px] h-[64px] p-[10px]';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'lg':
        return { width: 30, height: 30 };
      case 'md':
        return { width: 36, height: 36 };
      case 'sm':
        return { width: 24, height: 24 };
      default:
        return { width: 36, height: 36 };
    }
  };

  const getLabelText = () => {
    if (liked) return '찜한 기사님';
    return '기사님 찜하기';
  };

  return (
    <button
      type="button"
      aria-label="찜하기"
      className={`${baseStyles} ${getWrapperClasses()}`}
      onClick={handleClick}
      disabled={loading}
    >
      <Image
        src={liked ? '/icons/like-on.svg' : '/icons/like-empty.svg'}
        alt="like icon"
        width={getIconSize().width}
        height={getIconSize().height}
      />
      {size === 'lg' && (
        <span className="text-[18px] font-semibold text-[#000000]">{getLabelText()}</span>
      )}
    </button>
  );
};

export default LikeButton;
