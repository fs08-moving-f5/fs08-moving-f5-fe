'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';

// import Tab from '@/features/driver-estimate/ui/tab';
// import { EstimateClient } from '@/shared/ui/card/index';
// import EmptySection from '@/features/driver-estimate/ui/empty';

// const EstimateRejectsPage = () => {
//   return (
//     <main className="flex max-w-[1920px] flex-col justify-center">
//       <Tab />

//       <section className="mx-auto mt-[10px] w-full max-w-[1200px] sm:mb-[74px] md:mb-[110px] lg:mb-[83px]">
//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
//           <EstimateClient
//             customerName="김고객"
//             movingType="home"
//             pickedDriver={false}
//             pickupAddress="서울시 성북구"
//             dropoffAddress="서울시 노원구"
//             movingDate="2025년 01월 10일 (금)"
//             estimatePrice={300000}
//             status="rejected"
//           />
//           <EstimateClient
//             customerName="김고객"
//             movingType="home"
//             pickedDriver={false}
//             pickupAddress="서울시 성북구"
//             dropoffAddress="서울시 노원구"
//             movingDate="2025년 01월 10일 (금)"
//             estimatePrice={300000}
//             status="rejected"
//           />
//         </div>
//       </section>
//     </main>
//   );
// };

// export default EstimateRejectsPage;

import EstimateListPage from '../EstimateListPage';
import { getRejectEstimates } from '@/features/driver-estimate/services/driverEstimate.service';

const EstimateConfirmsPage = () => (
  <EstimateListPage
    queryKey={['estimate-confirms']}
    queryFn={getRejectEstimates}
    emptyType="reject"
    status="rejected"
  />
);

export default EstimateConfirmsPage;
