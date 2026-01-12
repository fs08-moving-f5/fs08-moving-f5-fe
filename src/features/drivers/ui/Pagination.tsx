import { useInfiniteQuery } from '@tanstack/react-query';
import { ElementType, useEffect, useRef } from 'react';
import { CursorResponse } from '../types/pagination';

/* === 무한 스크롤(세로) 페이네이션 컴포넌트 === */

/* 
아직 useInfiniteQuery의 파라미터들을 이해하지 못했습니다. 
nextCursor와 hasNext를 queryFn의 리턴 값으로 설정을 해주었지만, 
그게 커서와 남은 리스트가 있는지 여부를 전달하는 조건에 해당하는 건지 감이 안 잡힙니다.
*/

/**
 * 페이지네이션(무한 스크롤)을 쉽게 적용하기 위한 컴포넌트입니다.
 *
 * @param {Object} obj - 파라미터 객체
 * @param {string} obj.queryKeyName - 쿼리 키 구분용
 * @param {Record<string, string | undefined>} obj.filter - filter, search, sort 등 부가 쿼리 <항목, 값> 형태의 객체
 * @param {function} obj.getApi - 페이지네이션 api 함수
 * @param {ReactNode} obj.ElementNode - getApi의 반환값을 인자로 받는 컴포넌트, 페이지네이션에서 표시할 요소
 * @param {number} obj.pageSize - 한번에 불러올 데이터양
 * @param {number} obj.flexGap - 요소 간 간격
 * @param {string} obj.noElementMsg - 불러온 데이터가 없을 시 보여줄 메세지 내용
 */
export default function PaginationInfiniteScroll<T extends object | undefined>({
  queryKeyName, //쿼리키 구분용
  filter = {},
  getApi, //페이지네이션 fetch 함수
  ElementNode, // 받아온 데이터를 전달할 컴포넌트 (ReactNode)
  pageSize = 15, //한번에 불러올 데이터 양
  flexGap = 8, //요소 간 간격
  noElementMsg = '데이터 없음',
}: {
  queryKeyName: string;
  filter?: Record<string, string | undefined>;
  flexGap?: number;
  pageSize?: number;
  getApi: ({
    params: { cursor, limit, ...props },
  }: {
    params: { cursor?: string; limit?: number };
  }) => Promise<CursorResponse<T>>;
  ElementNode: ElementType;
  noElementMsg?: string;
}) {
  const fetchItems = async ({ pageParam }: { pageParam: unknown }) => {
    const cursor = pageParam && typeof pageParam === 'string' ? pageParam : '';
    const res = await getApi({ params: { cursor, limit: pageSize, ...filter } });
    return res;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    CursorResponse<T>, //queryFn 반환값
    Error //에러 타입
  >({
    queryKey: [queryKeyName, filter],
    queryFn: fetchItems, //페이지 파라미터만 전달받기 위해서 등록
    initialPageParam: null, // 첫 커서 값
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext) return undefined; //이게 hasNext 트리거를 사용하는 방법
      return lastPage.nextCursor ?? undefined;
    },
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  //스크롤 마지막 위치 감지 옵저버 설정
  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="flex w-full flex-col items-center" style={{ gap: `${flexGap}px` }}>
      {data && data.pages[0].items.length > 0 ? (
        <div className="flex flex-col" style={{ gap: `${flexGap}px` }}>
          <ul className="flex flex-col" style={{ gap: `${flexGap}px` }}>
            {data?.pages.map((page, idx) =>
              page.items?.map((props, idx2) => (
                <li key={idx * pageSize + idx2}>
                  <ElementNode {...props} />
                </li>
              )),
            )}
          </ul>
          <div className="flex w-full justify-center" ref={loadMoreRef}>
            {isFetchingNextPage && '불러오는 중...'}
          </div>
        </div>
      ) : (
        <div className="py-[50px]">{noElementMsg}</div>
      )}
    </div>
  );
}
