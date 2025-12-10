'use client';

import React from 'react';
import Image from 'next/image';

interface StarProps {
  fill: number;
  size: number;
}

const Star = ({ fill, size }: StarProps) => {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Image src="/icons/star-empty.svg" alt="empty star" fill style={{ objectFit: 'cover' }} />

      <div
        className="absolute top-0 left-0 overflow-hidden"
        style={{ width: `${fill}%`, height: '100%' }}
      >
        <Image src="/icons/star.svg" alt="filled star" fill style={{ objectFit: 'cover' }} />
      </div>
    </div>
  );
};

export default Star;
