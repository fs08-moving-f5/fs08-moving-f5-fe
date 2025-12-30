import ReceivedInfoCard from '../receivedInfoCard';
import { ReceivedEstimate } from '../../services/estimate.service';

const ReceivedCardContainer = ({ estimateRequests }: { estimateRequests?: ReceivedEstimate[] }) => {
  return (
    <div className="container-responsive tab:max-w-[600px] mobile:max-w-[375px] flex max-w-[1200px] flex-col gap-10">
      {estimateRequests?.map((estimateRequest) => (
        <ReceivedInfoCard
          key={estimateRequest.id}
          estimateRequest={estimateRequest}
          estimates={estimateRequest.estimates ?? []}
        />
      ))}
    </div>
  );
};

export default ReceivedCardContainer;
