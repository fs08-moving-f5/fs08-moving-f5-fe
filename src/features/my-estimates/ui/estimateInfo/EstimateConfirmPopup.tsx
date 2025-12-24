import { Button } from '@/shared/ui/button';
import { formatPrice } from '../../lib/price';
import IconWrapper from './IconWrapper';

const EstimateConfirmPopup = ({
  price,
  onConfirmClick,
}: {
  price: number;
  onConfirmClick: () => void;
}) => {
  const stroke = <div className="h-[1px] w-full bg-[#F2F2F2]" />;

  return (
    <div className="tab:hidden mobile:hidden flex w-[328px] flex-col gap-[29px]">
      <div className="flex flex-col">
        <div className="text-2lg font-semibold text-gray-300">견적가</div>
        <div className="text-black-400 text-2xl font-bold">{formatPrice(price)}</div>
      </div>
      <div className="flex flex-col gap-10">
        <Button size="md" variant="solid" onClick={onConfirmClick}>
          견적 확정하기
        </Button>
        <div className="w-full">{stroke}</div>
        <div className="flex flex-col gap-[22px]">
          <div className="text-black-400 text-xl font-semibold">견적서 공유하기</div>
          <IconWrapper />
        </div>
      </div>
    </div>
  );
};

export default EstimateConfirmPopup;
