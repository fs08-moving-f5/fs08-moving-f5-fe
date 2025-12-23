import { Button } from '@/shared/ui/button';
import Image from 'next/image';

const EstimateRequestButtonWrapper = () => {
  return (
    <div className="tab:flex mobile:flex tab:w-full mobile:w-full tab:items-center mobile:items-center tab:gap-2 mobile:gap-2 hidden">
      <button
        type="button"
        className="flex h-[54px] w-[54px] cursor-pointer items-center justify-center rounded-2xl border border-solid border-[#E6E6E6] p-[10px]"
      >
        <Image src="/icons/like-empty.svg" alt="like-empty" width={24} height={24} />
      </button>
      <Button variant="solid" size="sm">
        지정 견적 요청하기
      </Button>
    </div>
  );
};

export default EstimateRequestButtonWrapper;
