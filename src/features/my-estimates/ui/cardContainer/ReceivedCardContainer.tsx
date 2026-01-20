import ReceivedInfoCard from '../receivedInfoCard';
import { ReceivedEstimate } from '../../services/estimate.service';
import EmptyData from '@/shared/ui/empty/EmptyData';

const ReceivedCardContainer = ({ estimateRequests }: { estimateRequests?: ReceivedEstimate[] }) => {
  return (
    <div className="container-responsive tab:max-w-[600px] mobile:max-w-[375px] flex max-w-[1200px] flex-col gap-10">
      {estimateRequests?.length === 0 ? (
        <div className="tab:min-h-[657px] mobile:min-h-[417px] flex min-h-[900px] w-full items-center justify-center">
          <EmptyData message="받았던 견적이 없어요" subMessage="견적을 요청해 보세요!" />
        </div>
      ) : (
        estimateRequests?.map((estimateRequest) => (
          <ReceivedInfoCard
            key={estimateRequest.id}
            estimateRequest={estimateRequest}
            estimates={estimateRequest.estimates ?? []}
          />
        ))
      )}
    </div>
  );
};

export default ReceivedCardContainer;
