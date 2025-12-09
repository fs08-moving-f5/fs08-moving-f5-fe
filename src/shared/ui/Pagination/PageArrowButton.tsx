'use client';

import React from 'react';
import Image from 'next/image';

interface Props {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
}

const PageArrowButton = ({ direction, onClick, disabled }: Props) => {
  const isPrev = direction === 'prev';
  const label = isPrev ? '이전 페이지' : '다음 페이지';
  const arrow = isPrev ? '/icons/left_arrow.svg' : '/icons/right_arrow.svg';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded p-2 transition-all ${
        disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'
      }`}
      style={{
        color: disabled ? 'var(--color-gray-200)' : 'var(--color-white)',
      }}
      aria-label={label}
    >
      <Image src={arrow} alt={label} width={24} height={24} />
    </button>
  );
};

export default PageArrowButton;
