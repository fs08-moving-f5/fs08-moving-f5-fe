'use client';
import FindDriver from '@/shared/ui/card/FindDriver';
import EstimateDetail from '@/shared/ui/card/EstimateDetail';
import EstimateWait from '@/shared/ui/card/EstimateWait';
import Review from '@/shared/ui/card/Review';
import ReviewCanWrite from '@/shared/ui/card/ReviewCanWrite';
import ReviewWritten from '@/shared/ui/card/ReviewWritten';
import EstimateClient from '@/shared/ui/card/EstimateClient';
import RequestReceived from '@/shared/ui/card/RequestReceived';

export default function CardTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="mb-6 text-2xl font-bold">FindDriver 컴포넌트 테스트</h1>

        <RequestReceived
          customerName="홍길동"
          movingType="home"
          pickedDriver={true}
          pickupAddress="서울시 강남구"
          dropoffAddress="서울시 서초구"
          movingDate="2024년 07월 01일 (월)"
          requestTime="1시간 전"
          onSendEstimateClick={() => alert('견적서 보내기 클릭됨')}
          onRejectClick={() => alert('요청 반려 클릭됨')}
        />

        <FindDriver
          driverImageUrl="https://i.namu.wiki/i/QhqqJ7IFrrniG4DQeWlM6-dRuKeEDXY__U7WOuo1JmaP6wg35_Xa3X_ndOJO9ivEHDqj1U3MYwxQRb9jcxUa01FYBz_pi1DWc_-CZMWW4HuO0jin4fImq9ylaNWB_qKk9h0EnxVMQmuXMokNXemfEA.webp"
          title="고객님의 물품을 안전하게 운송해 드립니다."
          description="이사업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다."
          driverName="김코드"
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
          driverName="김코드"
          rating={5.0}
          reviewCount={178}
          experience="2년"
          moveCount="42건"
          likeCount={421}
          movingType="home"
          isLiked={true}
        />

        <EstimateWait
          driverName="이사왕"
          driverImageUrl="https://i.namu.wiki/i/QhqqJ7IFrrniG4DQeWlM6-dRuKeEDXY__U7WOuo1JmaP6wg35_Xa3X_ndOJO9ivEHDqj1U3MYwxQRb9jcxUa01FYBz_pi1DWc_-CZMWW4HuO0jin4fImq9ylaNWB_qKk9h0EnxVMQmuXMokNXemfEA.webp"
          rating={4.8}
          reviewCount={256}
          experience="5년"
          moveCount="1280건"
          movingType="office"
          pickedDriver={true}
          estimatePrice={250000}
        />
        <EstimateWait
          driverName="이사왕"
          rating={1.5}
          reviewCount={555}
          experience="1년"
          moveCount="240건"
          movingType="office"
          pickedDriver={false}
          estimatePrice={50000}
        />

        <Review
          userName="홍길동"
          date="2023-06-15"
          rating={1.3}
          content="최악입니다. 절대 이사람 고용하지 마세요."
        />

        <Review
          userName="김철수"
          date="2023-05-20"
          rating={4.6}
          content="이사 과정에서 몇 가지 문제가 있었지만, 전반적으로 만족스러운 경험이었습니다."
        />

        <Review
          userName="이영희"
          date="2023-04-10"
          rating={5.0}
          content="최고의 서비스! 기사님이 정말 프로페셔널하시고, 모든 것이 완벽하게 진행되었습니다."
        />

        <ReviewCanWrite
          driverName="박이사"
          description="이사업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다."
          movingType="small"
          pickedDriver={true}
          driverImageUrl="https://i.namu.wiki/i/QhqqJ7IFrrniG4DQeWlM6-dRuKeEDXY__U7WOuo1JmaP6wg35_Xa3X_ndOJO9ivEHDqj1U3MYwxQRb9jcxUa01FYBz_pi1DWc_-CZMWW4HuO0jin4fImq9ylaNWB_qKk9h0EnxVMQmuXMokNXemfEA.webp"
          pickupAddress="서울시 강남구"
          dropoffAddress="서울시 서초구"
          movingDate="2024년 07월 01일 (월)"
          estimatedPrice={350000}
          onWriteReview={() => alert('리뷰 작성하기 클릭됨')}
        />

        <ReviewCanWrite
          driverName="김캐리"
          description="쌍마트랜스에서 1년간 근무한 신입 기사입니다."
          movingType="home"
          pickedDriver={false}
          pickupAddress="서울시 도봉구"
          dropoffAddress="서울시 구로구"
          movingDate="2025년 05월 05일 (수)"
          estimatedPrice={50000}
          onWriteReview={() => alert('리뷰 작성하기 클릭됨')}
          disabled={true}
        />

        <EstimateDetail
          driverName="최고의 이사맨"
          driverImageUrl="https://i.namu.wiki/i/QhqqJ7IFrrniG4DQeWlM6-dRuKeEDXY__U7WOuo1JmaP6wg35_Xa3X_ndOJO9ivEHDqj1U3MYwxQRb9jcxUa01FYBz_pi1DWc_-CZMWW4HuO0jin4fImq9ylaNWB_qKk9h0EnxVMQmuXMokNXemfEA.webp"
          rating={4.9}
          reviewCount={320}
          experience="10년"
          moveCount="5000건"
          likeCount={200}
          isLiked={true}
          movingType="home"
          pickedDriver={true}
          estimatePrice={300000}
          isConfirmed={true}
        />

        <EstimateDetail
          driverName="신입 이사맨"
          rating={3.5}
          reviewCount={20}
          experience="1년"
          moveCount="100건"
          movingType="office"
          pickedDriver={false}
          estimatePrice={80000}
        />

        <ReviewWritten
          driverName="정이사"
          description="이사업계 경력 5년으로 안전한 이사를 도와드리는 정이사입니다."
          movingType="office"
          pickedDriver={true}
          driverImageUrl="https://i.namu.wiki/i/QhqqJ7IFrrniG4DQeWlM6-dRuKeEDXY__U7WOuo1JmaP6wg35_Xa3X_ndOJO9ivEHDqj1U3MYwxQRb9jcxUa01FYBz_pi1DWc_-CZMWW4HuO0jin4fImq9ylaNWB_qKk9h0EnxVMQmuXMokNXemfEA.webp"
          pickupAddress="서울시 마포구"
          dropoffAddress="서울시 영등포구"
          movingDate="2024년 08월 15일 (목)"
          rating={4.7}
          reviewContent="정이사 기사님과 함께한 이사는 정말 만족스러웠습니다. 시간 약속도 잘 지켜주시고, 물건들도 안전하게 옮겨주셔서 감사했습니다. 다음에도 꼭 다시 이용하고 싶습니다!"
          reviewDate="2024-08-16"
        />

        <ReviewWritten
          driverName="최이사"
          movingType="small"
          pickedDriver={false}
          pickupAddress="서울시 송파구"
          dropoffAddress="서울시 강동구"
          movingDate="2024년 09월 10일 (화)"
          rating={3.9}
          reviewContent="이사 과정에서 몇 가지 아쉬운 점이 있었지만, 전반적으로는 괜찮았습니다. 기사님이 친절하셨고, 물건들도 무사히 도착했습니다. 다만, 약속된 시간보다 조금 늦게 도착한 점은 개선되었으면 좋겠습니다."
          reviewDate="2024-09-11"
        />

        <EstimateClient
          customerName="박고객"
          movingType="home"
          pickedDriver={true}
          pickupAddress="서울시 강남구"
          dropoffAddress="서울시 서초구"
          movingDate="2024년 10월 01일 (월)"
          estimatePrice={400000}
          isConfirmed={true}
        />

        <EstimateClient
          customerName="이고객"
          movingType="office"
          pickedDriver={false}
          pickupAddress="서울시 은평구"
          dropoffAddress="서울시 종로구"
          movingDate="2024년 11월 20일 (수)"
          estimatePrice={120000}
        />

        <EstimateClient
          customerName="최고객"
          movingType="small"
          pickedDriver={true}
          pickupAddress="서울시 동작구"
          dropoffAddress="서울시 관악구"
          movingDate="2024년 12월 15일 (일)"
          estimatePrice={90000}
          isConfirmed={false}
          status="completed"
          onDetailClick={() => alert('견적 상세보기 클릭됨')}
        />

        <EstimateClient
          customerName="김고객"
          movingType="home"
          pickedDriver={false}
          pickupAddress="서울시 성북구"
          dropoffAddress="서울시 노원구"
          movingDate="2025년 01월 10일 (금)"
          estimatePrice={300000}
          status="rejected"
          onDetailClick={() => alert('견적 상세보기 클릭됨')}
        />
      </div>
    </div>
  );
}
