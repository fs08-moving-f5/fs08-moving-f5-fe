import { Button } from '@/shared/ui/button';
import { formatPrice } from '../../lib/price';
import IconWrapper from './IconWrapper';

const EstimateConfirmPopup = ({
  price,
  type,
  onConfirmClick,
}: {
  price: number;
  type: 'pending' | 'received';
  onConfirmClick: () => void;
}) => {
  const stroke = <div className="h-[1px] w-full bg-[#F2F2F2]" />;

  return (
    <div className="tab:hidden mobile:hidden flex w-[328px] flex-col items-start gap-[29px]">
      {type === 'pending' && (
        <>
          <div className="flex w-full flex-col">
            <div className="text-2lg font-semibold text-gray-300">견적가</div>
            <div className="text-black-400 text-2xl font-bold">{formatPrice(price)}</div>
          </div>
          <div className="flex w-full flex-col gap-10">
            <Button size="md" variant="solid" onClick={onConfirmClick}>
              견적 확정하기
            </Button>
            <div className="w-full">{stroke}</div>
            <IconWrapper type="desktop" />
          </div>
        </>
      )}
      {type === 'received' && <IconWrapper type="desktop" />}
    </div>
  );
};

export default EstimateConfirmPopup;
