import { formatPrice } from '../../lib/price';

const EstimatePriceInfo = ({ price }: { price: number }) => {
  const stroke = <div className="h-[1px] w-full bg-[#F2F2F2]" />;

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="w-full">{stroke}</div>
      <div className="flex items-center gap-[61px]">
        <div className="text-black-400 text-xl font-semibold">견적가</div>
        <div className="text-black-400 text-2xl font-bold">{formatPrice(price)}</div>
      </div>
      <div className="w-full">{stroke}</div>
    </div>
  );
};

export default EstimatePriceInfo;
