'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';

// import { EstimateListResponse } from '@/features/driver-estimate/types/driverEstimate';
// import { getConfirmEstimates } from '@/features/driver-estimate/services/driverEstimate.service';

// import Tab from '@/features/driver-estimate/ui/tab';
// import { EstimateClient } from '@/shared/ui/card/index';
// import EmptySection from '@/features/driver-estimate/ui/empty';

// const EstimateConfirmsPage = () => {
//   const loadMoreRef = useRef<HTMLDivElement | null>(null);

//   // useInfiniteQuery - 무한 스크롤
//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery<
//     EstimateListResponse,
//     Error,
//     InfiniteData<EstimateListResponse>,
//     ['estimate-confirms'],
//     string | null
//   >({
//     queryKey: ['estimate-confirms'],
//     queryFn: ({ pageParam }) => getConfirmEstimates({ cursor: pageParam }),
//     initialPageParam: null,
//     getNextPageParam: (lastPage) => lastPage.nextCursor,
//   });

//   const estimates = data?.pages.flatMap((page) => page.data) ?? [];

//   // 페이지네이션 - 무한 스크롤
//   useEffect(() => {
//     if (!loadMoreRef.current || !hasNextPage) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       { rootMargin: '200px', threshold: 0 },
//     );

//     observer.observe(loadMoreRef.current);

//     return () => observer.disconnect();
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   return (
//     <main className="flex max-w-[1920px] flex-col justify-center">
//       <Tab />

//       <section className="mx-auto mt-[10px] w-full max-w-[1200px] sm:mb-[74px] md:mb-[110px] lg:mb-[83px]">
//         {!isLoading && estimates.length === 0 ? (
//           <EmptySection type="confirm" />
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
//             {estimates.map((item) => (
//               <EstimateClient
//                 key={item.id}
//                 customerName={item.customerName}
//                 pickupAddress={item.pickupAddress}
//                 dropoffAddress={item.dropoffAddress}
//                 movingDate={item.movingDate}
//                 movingType={item.movingType}
//                 estimatePrice={item.estimatePrice}
//                 pickedDriver={item.pickedDriver}
//                 isConfirmed={item.isConfirmed}
//                 status={item.status}
//                 onDetailClick={() => alert}
//               />
//             ))}
//           </div>
//         )}

//         <div ref={loadMoreRef} />
//       </section>
//     </main>
//   );
// };

// export default EstimateConfirmsPage;

import EstimateListPage from '../EstimateListPage';
import { getConfirmEstimates } from '@/features/driver-estimate/services/driverEstimate.service';

const EstimateConfirmsPage = () => (
  <EstimateListPage
    queryKey={['estimate-confirms']}
    queryFn={getConfirmEstimates}
    emptyType="confirm"
    status="completed"
  />
);

export default EstimateConfirmsPage;
