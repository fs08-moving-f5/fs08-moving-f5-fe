import EstimatePriceInfo from './EstimatePriceInfo';
import EstimateRequestInfo from './EstimateRequestInfo';

import type { PendingDetailEstimatePriceInfoProps } from '../../types/pendingDetailTypes';

const PendingEstimateInfo = ({
  price,
  requestDate,
  movingType,
  movingDate,
  fromAddress,
  toAddress,
}: PendingDetailEstimatePriceInfoProps) => {
  return (
    <div className="w-full bg-white">
      <div className="container-responsive tab:max-w-[600px] mobile:max-w-[335px] max-w-[740px]">
        <EstimatePriceInfo price={price} />
        <EstimateRequestInfo
          requestDate={requestDate}
          movingType={movingType}
          movingDate={movingDate}
          fromAddress={fromAddress}
          toAddress={toAddress}
        />
      </div>
    </div>
  );
};

export default PendingEstimateInfo;
export { default as EstimateConfirmPopup } from './EstimateConfirmPopup';
export { default as EstimateRequestButtonWrapper } from './EstimateRequestButtonWrapper';
