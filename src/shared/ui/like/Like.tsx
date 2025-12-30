'use client';

import Image from 'next/image';

interface LikeProps {
  likeCount?: number;
  isLiked?: boolean;
  onLikeClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  showCount?: boolean;
}

const Like = ({
  likeCount = 0,
  isLiked = false,
  onLikeClick,
  size = 'large',
  showCount = true,
}: LikeProps) => {
  const likeIconSize = size === 'large' ? 28 : size === 'medium' ? 24 : 20;

  return (
    <div className="mobile:gap-1 tab:gap-1 flex items-center gap-1.5">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onLikeClick?.();
        }}
        type="button"
        aria-label="좋아요"
        className="cursor-pointer"
      >
        <Image
          src={isLiked ? '/icons/like-on.svg' : '/icons/like-off.svg'}
          alt="Like Icon"
          width={likeIconSize}
          height={likeIconSize}
          className="mobile:h-6 mobile:w-6 tab:h-6 tab:w-6"
        />
      </button>
      {showCount && (
        <span className="text-grayScale-500 mobile:text-md tab:text-md text-lg font-medium">
          {likeCount}
        </span>
      )}
    </div>
  );
};

export default Like;
