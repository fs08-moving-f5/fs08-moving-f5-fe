import { formatPrice } from '../../lib/price';

const EstimatePriceInfo = ({ price }: { price: number }) => {
  const stroke = (
    <svg xmlns="http://www.w3.org/2000/svg" width="741" height="1" viewBox="0 0 741 1" fill="none">
      <path d="M0 0.5H741" stroke="#F2F2F2" />
    </svg>
  );

  return (
    <div className="flex w-full flex-col gap-8">
      {stroke}
      <div className="flex items-center gap-[61px]">
        <div className="text-black-400 text-xl font-semibold">견적가</div>
        <div className="text-black-400 text-2xl font-bold">{formatPrice(price)}</div>
      </div>
      {stroke}
    </div>
  );
};

export default EstimatePriceInfo;
