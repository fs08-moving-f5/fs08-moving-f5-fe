'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Star from './Star';

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
  //   const src = isActive ? '/icons/star.svg' : '/icons/star-off.svg';

  //   return { star, src };
  // });

  const starElements = stars.map((star) => {
    let fill = 0;

    if (isReadOnly) {
      if (displayedRating >= star)
        fill = 100; // 완전 채움
      else if (displayedRating + 1 > star) {
        const fractional = displayedRating - (star - 1); // 0~1
        fill = Math.max(0, Math.min(100, fractional * 100));
      }
    } else {
      fill = star <= displayedRating ? 100 : 0; // post에서는 기존 방식
    }

    return { star, fill };
  });

  const handleMouseDown = (star: number) => {
    if (isReadOnly) return;

    setIsDragging(true);

    const isActiveStar = displayedRating >= star;

    if (isActiveStar) {
      // 채워진 별을 다시 클릭 → 0으로 리셋
      setRating(0);
      onChange?.(0);
      return;
    }

    setRating((prev) => (prev === star ? 0 : star));
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
      {starElements.map(({ star, fill }) => (
        <button
          key={star}
          className="p-1"
          onMouseDown={() => handleMouseDown(star)}
          onMouseMove={() => handleMouseMove(star)}
        >
          <Star fill={fill} size={size} />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
