import {
  QueryClient,
  QueryFunctionContext,
  QueryMeta,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { ElementType, useEffect, useRef } from 'react';

interface CursorResponse<T> extends Response {
  items: T[];
  nextCursor?: string;
}

export default function PagenationInfiniteScroll<T>({
  name,
  getApi,
  ElementNode,
  ITEMS_PER_PAGE,
}: {
  name: string;
  getApi: ({ pageParam }: QueryFunctionContext) => Promise<CursorResponse<T>>;
  ElementNode: ElementType;
  ITEMS_PER_PAGE: number;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    CursorResponse<T>, //queryFn 반환값
    Error, //에러 타입
    T[] | null //initial data 타입
  >({
    queryKey: [name],
    queryFn: getApi,
    initialPageParam: null, // 첫 커서 값
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const loadMoreRef = useRef<HTMLLIElement | null>(null);

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
    <div>
      {data && (
        <ul>
          {data.map((props, idx) => (
            <li key={idx}>
              <ElementNode {...props} />
            </li>
          ))}
          <li key={data.length} ref={loadMoreRef}>
            {isFetchingNextPage
              ? '불러오는 중...'
              : hasNextPage
                ? '스크롤하면 더 불러옵니다'
                : '끝'}
          </li>
        </ul>
      )}
    </div>
  );
}
