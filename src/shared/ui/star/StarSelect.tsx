'use client';

import Image from 'next/image';
import { useState } from 'react';

interface StarSelectProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: number;
}

const StarSelect = ({ rating, onRatingChange, size = 40 }: StarSelectProps) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (selectedRating: number) => {
    onRatingChange(selectedRating);
  };

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(0)}
          className="transition-transform hover:scale-110"
          aria-label={`${star}점`}
          type="button"
        >
          <Image
            src={star <= (hoveredRating || rating) ? '/icons/star.svg' : '/icons/star-empty.svg'}
            alt="별점"
            width={size}
            height={size}
          />
        </button>
      ))}
    </div>
  );
};

export default StarSelect;
