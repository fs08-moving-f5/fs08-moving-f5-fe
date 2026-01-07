'use client';

import { useState } from 'react';
import Image from 'next/image';

interface LikeButtonProps {
  size?: 'lg' | 'md' | 'sm';
  liked?: boolean;
  disabled?: boolean;
  onClick?: () => void | Promise<void>;
}

const LikeButton = ({
  size = 'md',
  liked: likedProp,
  disabled = false,
  onClick,
}: LikeButtonProps) => {
  const [uncontrolledLiked, setUncontrolledLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const isControlled = typeof likedProp === 'boolean';
  const liked = isControlled ? likedProp : uncontrolledLiked;
  const isDisabled = disabled || loading;

  const handleClick = async () => {
    if (isDisabled) return;

    if (!isControlled) {
      setUncontrolledLiked((prev) => !prev);
    }

    if (!onClick) return;

    try {
      setLoading(true);
      await onClick();
    } catch (err) {
      console.error(err);
      if (!isControlled) {
        setUncontrolledLiked((prev) => !prev);
      }
    } finally {
      setLoading(false);
    }
  };

  const baseStyles = `flex items-center justify-center rounded-[16px] border border-[var(--color-line-200)] bg-[var(--color-bg-100)] hover:bg-[var(--color-grayScale-50)] transition cursor-pointer`;

  const getWrapperClasses = () => {
    switch (size) {
      case 'lg':
        return 'w-full min-h-[60px] gap-[8px] px-[16px]';
      case 'md':
        return 'w-[64px] h-[64px] p-[10px]';
      case 'sm':
        return 'w-[54px] h-[54px] p-[10px]';
      default:
        return 'w-[64px] h-[64px] p-[10px]';
    }
  };

  const getDisabledStyles = () => {
    return isDisabled
      ? 'cursor-not-allowed bg-gray-200 text-gray-500 opacity-50 hover:bg-gray-200'
      : '';
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
      className={`${baseStyles} ${getWrapperClasses()} ${getDisabledStyles()}`}
      onClick={handleClick}
      disabled={isDisabled}
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
