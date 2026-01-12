import { Button } from '@/shared/ui/button';
import Image from 'next/image';

const EstimateRequestButtonWrapper = ({
  isLiked,
  onLikeClick,
  onConfirmClick,
}: {
  isLiked: boolean;
  onLikeClick: () => void;
  onConfirmClick: () => void;
}) => {
  return (
    <div className="tab:flex mobile:flex tab:w-full mobile:w-full tab:items-center mobile:items-center tab:gap-2 mobile:gap-2 hidden">
      <button
        type="button"
        className="flex h-[54px] w-[54px] cursor-pointer items-center justify-center rounded-2xl border border-solid border-[#E6E6E6] p-[10px]"
        onClick={onLikeClick}
      >
        <Image
          src={isLiked ? '/icons/like-on.svg' : '/icons/like-off.svg'}
          alt="like-icon"
          width={24}
          height={24}
        />
      </button>
      <Button aria-label="견적 확정하기" variant="solid" size="sm" onClick={onConfirmClick}>
        견적 확정하기
      </Button>
    </div>
  );
};

export default EstimateRequestButtonWrapper;
