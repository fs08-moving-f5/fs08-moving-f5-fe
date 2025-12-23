import { Button } from '@/shared/ui/button';
import { formatPrice } from '../../lib/price';
import IconWrapper from './IconWrapper';

const EstimateConfirmPopup = ({ price }: { price: number }) => {
  const stroke = (
    <svg xmlns="http://www.w3.org/2000/svg" width="328" height="1" viewBox="0 0 741 1" fill="none">
      <path d="M0 0.5H741" stroke="#F2F2F2" />
    </svg>
  );

  return (
    <div className="flex w-[328px] flex-col gap-[29px]">
      <div className="flex flex-col">
        <div className="text-2lg font-semibold text-gray-300">견적가</div>
        <div className="text-black-400 text-2xl font-bold">{formatPrice(price)}</div>
      </div>
      <div className="flex flex-col gap-10">
        <Button size="md" variant="solid">
          견적 확정하기
        </Button>
        {stroke}
        <div className="flex flex-col gap-[22px]">
          <div className="text-black-400 text-xl font-semibold">견적서 공유하기</div>
          <IconWrapper />
        </div>
      </div>
    </div>
  );
};

export default EstimateConfirmPopup;
