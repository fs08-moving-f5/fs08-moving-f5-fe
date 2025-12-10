'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const StarRating = () => {
  const [rating, setRating] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const stars = [1, 2, 3, 4, 5];

  const handleMouseDown = (star: number) => {
    setIsDragging(true);
    setRating((prev) => (prev === star ? 0 : star));
  };

  const handleMouseMove = (star: number) => {
    if (isDragging) setRating(star);
  };

  const stopDrag = () => setIsDragging(false);

  // ★ JSX 밖에서 렌더링 데이터 계산
  const starElements = stars.map((star) => {
    const isActive = star <= rating;
    const src = isActive ? '/icons/star.svg' : '/icons/star-off.svg';

    return {
      star,
      src,
    };
  });

  return (
    <div className="flex select-none" onMouseUp={stopDrag} onMouseLeave={stopDrag}>
      {starElements.map(({ star, src }) => (
        <button
          key={star}
          className="p-1"
          onMouseDown={() => handleMouseDown(star)}
          onMouseMove={() => handleMouseMove(star)}
        >
          <Image src={src} alt={`${star} star`} width={24} height={24} />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
