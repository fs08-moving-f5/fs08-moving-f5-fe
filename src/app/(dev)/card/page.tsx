import FindDriver from '@/shared/ui/card/FindDriver';
import QuoteWait from '@/shared/ui/card/QuoteWait';

export default function CardTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="mb-6 text-2xl font-bold">FindDriver 컴포넌트 테스트</h1>

        <FindDriver
          driverImageUrl="https://i.namu.wiki/i/QhqqJ7IFrrniG4DQeWlM6-dRuKeEDXY__U7WOuo1JmaP6wg35_Xa3X_ndOJO9ivEHDqj1U3MYwxQRb9jcxUa01FYBz_pi1DWc_-CZMWW4HuO0jin4fImq9ylaNWB_qKk9h0EnxVMQmuXMokNXemfEA.webp"
          title="고객님의 물품을 안전하게 운송해 드립니다."
          description="이사업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다."
          driverName="김코드 기사님"
          rating={5.0}
          reviewCount={178}
          experience="7년"
          moveCount="3342건"
          likeCount={136}
          movingType="small"
          isLiked={false}
        />

        <FindDriver
          title="고객님의 물품을 안전하게 운송해 드립니다."
          description="이사업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다."
          driverName="김코드 기사님"
          rating={5.0}
          reviewCount={178}
          experience="2년"
          moveCount="42건"
          likeCount={421}
          movingType="home"
          isLiked={true}
        />

        <QuoteWait
          driverName="이사왕 기사님"
          driverImageUrl="https://i.namu.wiki/i/QhqqJ7IFrrniG4DQeWlM6-dRuKeEDXY__U7WOuo1JmaP6wg35_Xa3X_ndOJO9ivEHDqj1U3MYwxQRb9jcxUa01FYBz_pi1DWc_-CZMWW4HuO0jin4fImq9ylaNWB_qKk9h0EnxVMQmuXMokNXemfEA.webp"
          rating={4.8}
          reviewCount={256}
          experience="5년"
          moveCount="1280건"
          movingType="office"
          pickedDriver={true}
          estimatePrice={250000}
        />
        <QuoteWait
          driverName="이사왕 기사님"
          rating={1.5}
          reviewCount={555}
          experience="1년"
          moveCount="240건"
          movingType="office"
          pickedDriver={false}
          estimatePrice={50000}
        />
      </div>
    </div>
  );
}
