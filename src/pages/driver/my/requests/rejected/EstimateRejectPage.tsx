'use client';

import { useState, useEffect, useRef } from 'react';
import Tab from '@/features/driver-estimate/ui/tab';
import { EstimateClient } from '@/shared/ui/card/index';
import EmptySection from '@/features/driver-estimate/ui/empty';

const EstimateRejectsPage = () => {
  return (
    <main className="flex max-w-[1920px] flex-col justify-center">
      <Tab />

      {/* <section className="mx-auto mt-[10px] w-full max-w-[1200px] sm:mb-[74px] md:mb-[110px] lg:mb-[83px]">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          <EstimateClient
            customerName="김고객"
            movingType="home"
            pickedDriver={false}
            pickupAddress="서울시 성북구"
            dropoffAddress="서울시 노원구"
            movingDate="2025년 01월 10일 (금)"
            estimatePrice={300000}
            status="rejected"
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
            customerName="이고객"
            movingType="office"
            pickedDriver={false}
            pickupAddress="서울시 은평구"
            dropoffAddress="서울시 종로구"
            movingDate="2024년 11월 20일 (수)"
            estimatePrice={120000}
          />
        </div>
      </section> */}
      <EmptySection type="reject" />
    </main>
  );
};

export default EstimateRejectsPage;
