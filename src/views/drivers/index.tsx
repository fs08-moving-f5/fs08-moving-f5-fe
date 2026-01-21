'use client';

import DRIVERS_QUERY_KEY from '@/features/drivers/constants/queryKey';
import { useHandleFavorite } from '@/shared/hooks/useFavorite';
import {
  getDriverList,
  getFavoriteDrivers,
  DriverInfoType,
  FavoriteDriverInfoType,
} from '@/features/drivers/services/drivers.service';
import PaginationInfiniteScroll from '@/features/drivers/ui/Pagination';
import { FindDriver } from '@/shared/ui/card';
import DropdownFilter from '@/shared/ui/dropdown/DropdownFilter';
import DropdownSort from '@/shared/ui/dropdown/DropdownSort';
import SearchBar from '@/shared/ui/input/SearchBar';
import Link from 'next/link';
import { useState } from 'react';

export default function DriversPageClient({
  router,
  isLoggedIn,
}: {
  router: string; //페이지 절대 경로 (상세페이지 이동 기준 용)
  isLoggedIn: boolean;
}) {
  const regionDict = {
    all: '전체',
    seoul: '서울',
    gyeonggi: '경기',
    incheon: '인천',
    gangwon: '강원',
    chungbuk: '충북',
    chungnam: '충남',
    daejeon: '대전',
    sejong: '세종',
    jeonbuk: '전북',
    jeonnam: '전남',
    gwangju: '광주',
    gyeongbuk: '경북',
    gyeongnam: '경남',
    daegu: '대구',
    busan: '부산',
    ulsan: '울산',
    jeju: '제주',
  };

  const serviceDict = {
    all: '전체',
    SMALL_MOVING: '소형이사',
    HOME_MOVING: '가정이사',
    OFFICE_MOVING: '사무실이사',
  };

  const sortDict = {
    review: '리뷰많은순',
    rating: '평점높은순',
    career: '경력많은순',
    'confirmed-estimate': '확정많은순',
  };

  type regionType = keyof typeof regionDict;
  type serviceType = keyof typeof serviceDict;
  type sortType = keyof typeof sortDict;

  const [region, setRegion] = useState<regionType>('all');
  const [service, setService] = useState<serviceType>('all');
  const [sort, setSort] = useState<sortType>('review');
  const [keyword, setKeyword] = useState('');

  const convertMovingType = (
    v: 'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING',
  ): 'small' | 'home' | 'office' => {
    switch (v) {
      case 'SMALL_MOVING':
        return 'small';
      case 'HOME_MOVING':
        return 'home';
      case 'OFFICE_MOVING':
        return 'office';
    }
  };

  const handleLikeClick = useHandleFavorite();

  const DriverCard = (params: DriverInfoType) => {
    return (
      <Link href={`${router}/${params.id}`} className="block w-full">
        <FindDriver
          title={params.driverProfile?.shortIntro || '제목 없음'}
          description={params.driverProfile?.description || '설명 없음'}
          driverName={params.name || '이름 없음'}
          driverImageUrl={params.driverProfile?.imageUrl || undefined}
          rating={params.averageRating || 0}
          reviewCount={params.reviewCount || 0}
          experience={`${params.career || 0}년`}
          moveCount={params.confirmedEstimateCount?.toString() || '0'}
          movingTypeArray={
            (params.driverProfile?.services &&
              params.driverProfile?.services.length > 0 &&
              params.driverProfile?.services.map((service) => convertMovingType(service))) ||
            undefined
          }
          likeCount={params.favoriteDriverCount || 0}
          isLiked={params.isFavorite}
          likeFunction={(_isLiked) => {
            if (params.id) {
              handleLikeClick({ driverId: params.id, isLiked: !_isLiked });
            }
          }}
        />
      </Link>
    );
  };

  const FavoriteDriverCard = (params: FavoriteDriverInfoType) => {
    return (
      <Link href={`${router}/${params.driverId}`} className="block w-full">
        <FindDriver
          title={params.driver?.driverProfile?.shortIntro || '제목 없음'}
          description={params.driver?.driverProfile?.description || '설명 없음'}
          driverName={params.driver?.name || '이름 없음'}
          driverImageUrl={params.driver?.driverProfile?.imageUrl || undefined}
          rating={params.driver?.driverProfile?.averageRating || 0}
          reviewCount={params.driver?.driverProfile?.reviewCount || 0}
          experience={`${params.driver?.driverProfile?.career || 0}년`}
          moveCount={params.driver?.driverProfile?.confirmedEstimateCount?.toString() || '0'}
          movingTypeArray={
            (params.driver?.driverProfile?.services &&
              params.driver?.driverProfile?.services.length > 0 &&
              params.driver?.driverProfile?.services.map((service) =>
                convertMovingType(service),
              )) ||
            undefined
          }
          likeCount={params.driver?.driverProfile?.favoriteDriverCount || 0}
          isLiked={true}
          likeFunction={(_isLiked) => {
            if (params.driverId) {
              handleLikeClick({ driverId: params.driverId, isLiked: !_isLiked });
            }
          }}
          smallStyle={true}
        />
      </Link>
    );
  };

  return (
    <div className="flex h-full w-full flex-col items-center relative">
      <div className="tab:px-[72px] mobile:px-[24px] flex h-full w-full max-w-[1200px] flex-col">
        <div className="h-fit w-full sticky top-0 z-10 bg-white relative">
          <div className="py-[32px]">
            <h1 className="text-start text-[24px] leading-[32px] font-[600]">기사님 찾기</h1>
          </div>
          <div className="tab:max-w-full flex w-full max-w-[820px] flex-col gap-[38px]">
            <SearchBar widthFull={true} onSubmit={(value: string) => setKeyword(value)} />
            <div className="flex w-full justify-between">
              <div className="flex h-fit w-fit items-center gap-[25px]">
                <div className="flex w-fit gap-[12px]">
                  <DropdownFilter
                    title="지역"
                    listObject={regionDict}
                    value={region}
                    setValue={(v) => setRegion(v as regionType)}
                  />
                  <DropdownFilter
                    title="서비스"
                    listObject={serviceDict}
                    value={service}
                    setValue={(v) => setService(v as serviceType)}
                  />
                </div>
                <button
                  onClick={() => {
                    setRegion('all');
                    setService('all');
                    setSort('review');
                    setKeyword('');
                  }}
                  className="tab:hidden cursor-pointer border-none text-[16px] leading-[26px] font-[500] text-[var(--color-gray-300)] hover:brightness-50"
                >
                  초기화
                </button>
              </div>
              <DropdownSort
                listObject={sortDict}
                value={sort}
                setValue={(v) => setSort(v as sortType)}
              />
            </div>
          </div>
          <div className="h-[24px] w-full bg-white" />
          <div className="pointer-events-none absolute inset-x-0 -bottom-[24px] h-[24px] bg-gradient-to-b from-white to-transparent" />
          <div className="tab:hidden absolute right-0 flex h-fit flex-col gap-[16px] z-10">
            <h2 className="text-start text-[20px] leading-[32px] font-[600]">찜한 기사님</h2>
            <div className="scrollbar-hide scroll-mask h-[calc(80vh-250px)] w-full max-w-[820px] flex-col overflow-scroll overscroll-behavior py-[16px]">
              {isLoggedIn ? (
                <PaginationInfiniteScroll<FavoriteDriverInfoType>
                  queryKey={DRIVERS_QUERY_KEY.FAVORITE_DRIVERS}
                  flexGap={16}
                  pageSize={10}
                  getApi={getFavoriteDrivers} //getFavoriteDriverList
                  ElementNode={FavoriteDriverCard}
                  noElementMsg="찜한 기사님이 없습니다."
                />
              ) : (
                <div className="py-[50px]">로그인이 필요합니다.</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-start gap-[38px] relative">
          <div className="mb-[200px] flex h-full w-full gap-[54px]">
            <div className="scrollbar-hide scroll-mask tab:min-w-0 tab:max-w-full h-auto w-full max-w-[820px] min-w-[820px] flex-col overflow-visible py-[16px]">
              <PaginationInfiniteScroll<DriverInfoType>
                queryKey={DRIVERS_QUERY_KEY.DRIVER}
                flexGap={20}
                pageSize={10}
                getApi={getDriverList}
                filter={{
                  region: region === 'all' ? undefined : region,
                  service: service === 'all' ? undefined : service,
                  search: keyword,
                  sort,
                }}
                ElementNode={DriverCard}
                noElementMsg="조건에 해당하는 기사님이 없습니다."
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
