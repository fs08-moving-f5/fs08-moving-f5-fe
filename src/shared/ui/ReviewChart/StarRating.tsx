'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const StarRating = () => {
  const [rating, setRating] = useState<number>(0);

  const renderStar = (star: number) => {
    const isActive = star <= rating;
    const src = isActive ? '/icons/star.svg' : '/icons/star-off.svg';

    const handleClick = () => {
      // 같은 별을 한 번 더 클릭하면 0으로 리셋
      if (rating === star) {
        setRating(0);
      } else {
        setRating(star);
      }
    };

    return (
      <button key={star} onClick={handleClick} className="p-1">
        <Image src={src} alt={`${star} star`} width={24} height={24} />
      </button>
    );
  };

  return <div className="flex">{[1, 2, 3, 4, 5].map(renderStar)}</div>;
};

export default StarRating;
