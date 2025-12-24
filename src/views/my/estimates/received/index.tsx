import ReceivedEstimatesTab from '@/features/my-estimates/ui/tab';
import { ReceivedCardContainer } from '@/features/my-estimates/ui/cardContainer';

const ReceivedEstimatesPageClient = () => {
  return (
    <div className="bg-bg-100">
      <ReceivedEstimatesTab activeTab="received" />
      <div className="tab:mt-[32px] mobile:mt-[32px] tab:gap-4 mobile:gap-1 mt-[64px] mb-[122px] flex flex-col gap-10">
        <ReceivedCardContainer />
        <ReceivedCardContainer />
      </div>
    </div>
  );
};

export default ReceivedEstimatesPageClient;
