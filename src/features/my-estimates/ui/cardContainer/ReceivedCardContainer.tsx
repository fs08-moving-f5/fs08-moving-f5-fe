import ReceivedInfoCard from '../receivedInfoCard';

const ReceivedCardContainer = () => {
  return (
    <div className="container-responsive tab:max-w-[600px] mobile:max-w-[375px] flex max-w-[1200px] flex-col gap-10">
      <ReceivedInfoCard />
    </div>
  );
};

export default ReceivedCardContainer;
