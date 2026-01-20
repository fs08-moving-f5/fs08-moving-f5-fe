'use client';

import { useEffect, RefObject, useRef } from 'react';

interface UseObserverParams {
  targetRef: RefObject<Element | null>;
  onIntersect: () => void;
  enabled: boolean;
  rootMargin?: string;
  threshold?: number;
}

export const useObserver = ({
  targetRef,
  onIntersect,
  enabled,
  rootMargin = '200px',
  threshold = 0,
}: UseObserverParams) => {
  const onIntersectRef = useRef(onIntersect);

  useEffect(() => {
    onIntersectRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    const target = targetRef.current;

    if (!enabled || !target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry?.isIntersecting) onIntersectRef.current();
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [enabled, targetRef, rootMargin, threshold]);
};
