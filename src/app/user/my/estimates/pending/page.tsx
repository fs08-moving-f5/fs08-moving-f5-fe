import GNB from '@/shared/ui/gnb';
import PendingEstimatesTab from '@/features/my-estimates/pending/ui/tab';

const PendingEstimatesPage = () => {
  return (
    <div>
      <GNB />
      <PendingEstimatesTab activeTab="pending" />
    </div>
  );
};

export default PendingEstimatesPage;
