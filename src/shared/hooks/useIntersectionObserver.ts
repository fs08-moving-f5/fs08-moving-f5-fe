import { useEffect, useRef, RefObject } from 'react';

interface UseIntersectionObserverOptions {
  /**
   * 요소가 뷰포트에 들어올 때 실행할 콜백 함수
   */
  onIntersect: () => void;
  /**
   * 관찰을 활성화할지 여부
   * @default true
   */
  enabled?: boolean;
  /**
   * IntersectionObserver의 rootMargin 옵션
   * @default '200px'
   */
  rootMargin?: string;
  /**
   * IntersectionObserver의 threshold 옵션
   * @default 0
   */
  threshold?: number | number[];
}

/**
 * 무한 스크롤을 위한 Intersection Observer 훅
 *
 * @example
 * ```tsx
 * const { ref } = useIntersectionObserver({
 *   onIntersect: () => fetchNextPage(),
 *   enabled: hasNextPage && !isFetchingNextPage,
 * });
 *
 * return <div ref={ref}>로딩 중...</div>;
 * ```
 */
export const useIntersectionObserver = ({
  onIntersect,
  enabled = true,
  rootMargin = '200px',
  threshold = 0,
}: UseIntersectionObserverOptions): { ref: RefObject<HTMLDivElement | null> } => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    const currentTarget = targetRef.current;
    observer.observe(currentTarget);

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      observer.disconnect();
    };
  }, [enabled, onIntersect, rootMargin, threshold]);

  return { ref: targetRef };
};
