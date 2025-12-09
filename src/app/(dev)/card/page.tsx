'use client'; 

import FindDriver from '@/shared/card/FindDriver';

export default function CardTestPage() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-6">FindDriver 컴포넌트 테스트</h1>
        
        <FindDriver
          title="고객님의 물품을 안전하게 운송해 드립니다."
          description="이사업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다."
          driverName="김코드 기사님"
          rating={5.0}
          reviewCount={178}
          experience="7년"
          moveCount="3342건"
          likeCount={136}
          chipLabel="소형이사"
        />

        <FindDriver
          title="고객님의 물품을 안전하게 운송해 드립니다."
          description="이사업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다."
          driverName="김코드 기사님"
          rating={5.0}
          reviewCount={178}
          experience="7년"
          moveCount="3342건"
          likeCount={136}
        />
      </div>
    </div>
  );
}