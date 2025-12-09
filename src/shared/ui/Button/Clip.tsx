'use client';

import React from 'react';
import Image from 'next/image';

interface ClipProps {
  size?: 'lg' | 'md' | 'sm';
}

const Clip = ({ size = 'lg' }: ClipProps) => {
  const baseStyles = `flex cursor-pointer items-center justify-center rounded-[16px] border border-[var(--color-line-200)] bg-[var(--color-grayScale-50)] transition hover:bg-[var(--color-grayScale-100)]`;

  const getWrapperClasses = () => {
    switch (size) {
      case 'lg':
        return 'w-[64px] h-[64px] p-[10px]';
      case 'md':
        return 'w-[54px] h-[54px] p-[10px]';
      case 'sm':
        return 'w-[40px] h-[40px] p-[10px]';
      default:
        return 'w-[64px] h-[64px] p-[10px]';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'lg':
        return { width: 36, height: 36 };
      case 'md':
        return { width: 24, height: 24 };
      case 'sm':
        return { width: 24, height: 24 };
      default:
        return { width: 36, height: 36 };
    }
  };

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // 토스트나 알림 UI 연결
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
    }
  };

  return (
    <button className={`${baseStyles} ${getWrapperClasses()}`} onClick={handleClick}>
      <Image
        src="/icons/clip.svg"
        alt="clip icon"
        width={getIconSize().width}
        height={getIconSize().height}
      />
    </button>
  );
};

export default Clip;
