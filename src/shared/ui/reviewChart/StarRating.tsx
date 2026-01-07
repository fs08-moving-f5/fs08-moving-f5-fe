'use client';

import React, { useState } from 'react';
import Image from 'next/image';
// import Star from './Star';

interface StarRatingProps {
  type: 'get' | 'post';
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void; // type=post일 때 필수 - 별점을 서버로 보내거나 폼 데이터에 넣기
}

const StarRating = ({ type = 'get', value, defaultValue = 0, onChange }: StarRatingProps) => {
  const [rating, setRating] = useState<number>(defaultValue);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const size = type === 'get' ? 20 : 36;

  const stars = [1, 2, 3, 4, 5];

  const isReadOnly = type === 'get';

  const displayedRating = isReadOnly ? (value ?? 0) : rating;

  // const starElements = stars.map((star) => {
  //   const isActive = star <= displayedRating;
  //   const src = isActive ? '/icons/star.svg' : '/icons/star-empty.svg';

  //   return { star, src };
  // });

  const handleMouseDown = (star: number) => {
    if (isReadOnly) return;

    setIsDragging(true);

    if (displayedRating >= star) {
      // 채워진 별을 다시 클릭 → 0으로 리셋
      setRating(0);
      onChange?.(0);
      return;
    }

    setRating(star);
    onChange?.(star);
  };

  const handleMouseMove = (star: number) => {
    if (isReadOnly || !isDragging) return;
    setRating(star);
    onChange?.(star);
  };

  const stopDrag = () => setIsDragging(false);

  return (
    <div
      className={`flex select-none ${isReadOnly ? 'pointer-events-none' : ''}`}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      {stars.map((star) => {
        const isActive = star <= displayedRating;
        const src = isActive ? '/icons/star.svg' : '/icons/star-empty.svg';
        return (
          <button
            key={star}
            type="button"
            className="p-1"
            aria-label={`${star}점`}
            aria-pressed={isActive}
            onMouseDown={() => handleMouseDown(star)}
            onMouseMove={() => handleMouseMove(star)}
          >
            <Image src={src} alt="" width={size} height={size} />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
