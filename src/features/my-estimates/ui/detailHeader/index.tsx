import Image from 'next/image';

const PendingEstimateDetailHeader = ({ driverImageUrl }: { driverImageUrl: string }) => {
  return (
    <>
      <header className="w-full bg-white py-8">
        <div className="container-responsive tab:max-w-[600px] mobile:max-w-[335px] tab:text-2xl mobile:text-xl text-black-500 flex max-w-[1200px] items-center justify-start px-2 text-2xl font-semibold">
          견적 상세
        </div>
      </header>
      <div className="mobile:pb-[76px] tab:pb-[60px] relative pb-[52px]">
        <Image
          src="/img/myPendingEstimate/bg-img.png"
          alt="bg-img"
          width={1920}
          height={180}
          className="tab:h-[157px] mobile:h-[122px] h-[180px] object-cover"
          priority
        />

        <div className="button-0 tab:top-[78.5px] mobile:top-[61px] absolute top-[90px] right-0 left-0">
          <div className="container-responsive tab:max-w-[600px] mobile:max-w-[335px] max-w-[1200px]">
            <Image
              src={driverImageUrl}
              alt="driverImg"
              width={134}
              height={134}
              className="h-[134px] w-[134px] rounded-[12px] object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingEstimateDetailHeader;
